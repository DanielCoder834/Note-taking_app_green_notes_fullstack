package main

import (
	"context"
	"errors"
	"fmt"
	"green-notes-backend/requests"
	//"green_notes_backend/database"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime/pprof"
)

//var validate *validator.Validate =

func main() {
	fmt.Println("Starting up server")
	//requests.Validate = validate
	// Sets up the server values
	dbPool := &requests.DatabasePool{Db: requests.ConnectDb()}
	ctx := context.Background()
	requests.SetUpTables(dbPool, ctx)

	// Handles sigint interrupts
	go handleSIGINT(ctx, dbPool)

	// Routes
	mux := http.NewServeMux()
	mux.HandleFunc("/", requests.GetRoot)
	mux.HandleFunc("/hello", requests.GetHello)
	mux.HandleFunc("/ping", requests.Ping)
	mux.HandleFunc("/db/addUser", dbPool.AddUser)
	mux.HandleFunc("/db/addNote", dbPool.AddNote)
	mux.HandleFunc("/db/updatePassword", dbPool.UpdatePassword)
	mux.HandleFunc("/db/updateEmail", dbPool.UpdateEmail)
	mux.HandleFunc("/db/updateUsername", dbPool.UpdateUsername)
	mux.HandleFunc("/db/userExists", dbPool.DoesUserExistRoute)
	mux.HandleFunc("/db/emailExists", dbPool.DoesEmailExistRoute)
	mux.HandleFunc("/db/matchesPassword", dbPool.DoesPasswordMatch)
	mux.HandleFunc("/db/getUsernameById", dbPool.GetUsernameById)
	mux.HandleFunc("/db/getEmailById", dbPool.GetEmailById)
	mux.HandleFunc("/db/getAmountDonated", dbPool.GetAmountDonatedById)
	mux.HandleFunc("/db/getTreesPlanted", dbPool.GetTreesPlantedById)
	mux.HandleFunc("/db/getAmountOfNotes", dbPool.GetAmountOfNotesById)
	mux.HandleFunc("/db/getAllNotesById", dbPool.GetAllNotesById)
	mux.HandleFunc("/db/deleteNoteById", dbPool.DeleteNoteById)
	mux.HandleFunc("/db/updateNoteTitle", dbPool.UpdateNoteTitleByNoteId)
	mux.HandleFunc("/db/updateNoteText", dbPool.UpdateNoteTextByNoteId)
	mux.HandleFunc("/db/getNoteText", dbPool.GetNoteTextByNoteId)
	mux.HandleFunc("/db/deleteAccount", dbPool.DeleteAccountByCookieId)
	mux.HandleFunc("/cookies/setSessionCookie", dbPool.SetSessionCookieHandler)
	mux.HandleFunc("/cookies/getSessionCookie", requests.GetSessionCookieHandler)
	mux.HandleFunc("/cookies/deleteCookie", requests.DeleteCookieHandler)
	//mux.HandleFunc("/auth", requests.Auth)

	//// TLS Configuration
	// TODO: When I get the domain for the website, then we use Let's Encrypt
	// Let's Encrypt doesn't validate localhost
	//certManager := autocert.Manager{
	//	Prompt:     autocert.AcceptTOS,
	//	HostPolicy: autocert.HostWhitelist("localhost:3333"), //Your domain here
	//	Cache:      autocert.DirCache("certs"),               //Folder for storing certificates
	//}

	//http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	//	w.Write([]byte("Hello world"))
	//})

	//go http.ListenAndServe(":https", certManager.HTTPHandler(nil))

	// The Server
	server := &http.Server{
		Addr:    "localhost:3333",
		Handler: mux,
		BaseContext: func(l net.Listener) context.Context {
			ctx = context.WithValue(ctx, requests.KeyServerAddr, l.Addr().String())
			return ctx
		},
		//TLSConfig: &tls.Config{
		//	GetCertificate: certManager.GetCertificate,
		//	MinVersion:     tls.VersionTLS12, // improves cert reputation score at https://www.ssllabs.com/ssltest/
		//},
	}

	// Error Handling
	//err := server.ListenAndServeTLS("cert.pem", "key.pem")
	err := server.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error listening for server: %s\n", err)
	}
}

// handleSIGINT handles the cleanup of various values when control + C is used
// or a SIGINT is trigger, and then exits normally
func handleSIGINT(ctx context.Context, dpPool *requests.DatabasePool) {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	// for sig = range c {
	// Loops through the signals in c
	// Only one signal
	for _ = range c {
		requests.DropTables(dpPool, ctx)
		dpPool.Db.Close()
		fmt.Println("Closing server")
		pprof.StopCPUProfile()
		os.Exit(1)
	}
}
