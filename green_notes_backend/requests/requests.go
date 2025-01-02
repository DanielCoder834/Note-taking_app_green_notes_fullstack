package requests

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/go-playground/validator/v10"
	"green-notes-backend/security"
	"green-notes-backend/types"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

const KeyServerAddr = "serverAddr"

var validate *validator.Validate = validator.New(validator.WithRequiredStructEnabled())

// GetRoot /* Basic Examples from Tutorial: Meant to be used as a reference */
func GetRoot(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	hasFirst := r.URL.Query().Has("first")
	first := r.URL.Query().Get("first")
	hasSecond := r.URL.Query().Has("second")
	second := r.URL.Query().Get("second")

	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("could not read body: %s\n", err)
	}

	fmt.Printf("%s: got / request. first(%t)=%s, second(%t)=%s body:\n%s\n",
		ctx.Value(KeyServerAddr), hasFirst, first,
		hasSecond, second,
		body)
	io.WriteString(w, "This is my website!\n")
}

// GetHello /* Basic Examples from Tutorial: Meant to be used as a reference */
func GetHello(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	fmt.Printf("%s: got /hello request\n", ctx.Value(KeyServerAddr))

	myName := r.PostFormValue("myName")
	if myName == "" {
		w.Header().Set("x-missing-field", "myName")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	io.WriteString(w, fmt.Sprintf("Hello, %s!\n", myName))
}

// Ping just a normal ping to the server, should work 100% of the time.
// If it doesn't work, something is very wrong
func Ping(w http.ResponseWriter, r *http.Request) {
	log.Printf("Ping: The ping endpoint has been called\n")
	_, err := io.WriteString(w, "Pinged\n")
	if err != nil {
		return
	}
}

// AddUser adds a user to the database
func (dbpool *DatabasePool) AddUser(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	var message types.UserSignUp
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("add-user: could not read body: %s\n", err)
	}
	jsonErr := json.Unmarshal(body, &message)
	if jsonErr != nil {
		log.Printf("add-user: could not decode json: %s\n", err)
		// One empty request being sent
		return
	}
	validateErr := validate.Struct(message)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	log.Printf("%+v\n", message)
	insertErr := InsertUser(dbpool, r.Context(), message)
	if insertErr != nil {
		//fmt.Printf("could not insert obj: %s\n", insertErr)
		// Log Issue
		if strings.Contains(insertErr.Error(), "ERROR: duplicate key value violates unique constraint "+
			"\"uq_email_constraint\"") {
			log.Println("add-user: Email already in use")
			http.Error(w, "Email already in use", http.StatusBadRequest)
		} else {
			http.Error(w, "Server Issue", http.StatusInternalServerError)
		}
		return
	}
}

func (dbpool *DatabasePool) AddNote(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	hasTitle := r.URL.Query().Has("title")
	if !hasTitle {
		http.Error(w, "No Title Found Error", http.StatusBadRequest)
		log.Printf("Note Addition Error\n")
		return
	}
	title := r.URL.Query().Get("title")

	hasNoteKey := r.URL.Query().Has("noteKey")
	if !hasNoteKey {
		http.Error(w, "No Note Key Found Error", http.StatusBadRequest)
		log.Printf("Note Addition Error\n")
		return
	}
	noteKey := r.URL.Query().Get("noteKey")
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("get-username-by-id: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by get-username-by-id", http.StatusInternalServerError)
		return
	}

	insertErr := InsertNote(dbpool, r.Context(), noteKey, title, decryptedUserId)
	if insertErr != nil {
		log.Printf("insert-note: %s\n", insertErr)
		http.Error(w, "Issue with Inserting New Note", http.StatusInternalServerError)
		return
	}
	return
}

// UpdatePassword checks if the user exists in the database
func (dbpool *DatabasePool) UpdatePassword(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	var userLogin types.UserLogin
	body, readErr := io.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("updatePassword: %+v\n", body)
		log.Printf("updatePassword: could not read body: %s\n", readErr)
	}

	jsonErr := json.Unmarshal(body, &userLogin)
	if jsonErr != nil {
		log.Printf("updatePassword: could not decode json: %s\n", jsonErr)
		// One empty request being sent
		//http.Error(w, "", http.StatusInternalServerError)
		return
	}
	log.Printf("%+v\n", userLogin)
	validateErr := validate.Struct(userLogin)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	result, resultErr := UpdatePasswordByEmailDb(dbpool, r.Context(), userLogin.Email, userLogin.Password)
	if resultErr != nil {
		log.Printf("updatePassword: could not decode json: %s\n", resultErr)
		http.Error(w, "Issue with Updating Password", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(result))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) UpdateEmail(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)

	var newEmailOldEmail types.NewEmailOldEmail
	body, readErr := io.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("updateEmail: %+v\n", body)
		log.Printf("updateEmail: could not read body: %s\n", readErr)
	}

	jsonErr := json.Unmarshal(body, &newEmailOldEmail)
	if jsonErr != nil {
		log.Printf("updateEmail: could not decode json: %s\n", jsonErr)
		return
	}
	log.Printf("%+v\n", newEmailOldEmail)
	validateErr := validate.Struct(newEmailOldEmail)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	result, resultErr := UpdateEmailByEmailDb(dbpool, r.Context(), newEmailOldEmail.Email, newEmailOldEmail.NewEmail)
	if resultErr != nil {
		log.Printf("updateEmail: could not decode json: %s\n", resultErr)
		http.Error(w, "Issue with Updating Email", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(result))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) UpdateUsername(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	var emailUsername types.EmailUsername
	body, readErr := io.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("updateUsername: %+v\n", body)
		log.Printf("updateUsername: could not read body: %s\n", readErr)
	}

	jsonErr := json.Unmarshal(body, &emailUsername)
	if jsonErr != nil {
		log.Printf("updateUsername: could not decode json: %s\n", jsonErr)
		return
	}
	log.Printf("%+v\n", emailUsername)
	validateErr := validate.Struct(emailUsername)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	result, resultErr := UpdateUsernameByEmailDb(dbpool, r.Context(), emailUsername.Email, emailUsername.Username)
	if resultErr != nil {
		log.Printf("updateUsername: could not decode json: %s\n", resultErr)
		http.Error(w, "Issue with Updating Username", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(result))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

// DoesUserExistRoute checks if the user exists in the database
func (dbpool *DatabasePool) DoesUserExistRoute(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	var userLogin types.UserLogin
	body, readErr := io.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("userExists: %+v\n", body)
		log.Printf("userExists: could not read body: %s\n", readErr)
	}

	jsonErr := json.Unmarshal(body, &userLogin)
	if jsonErr != nil {
		log.Printf("userExists: could not decode json: %s\n", jsonErr)
		// One empty request being sent
		//http.Error(w, "", http.StatusInternalServerError)
		return
	}
	log.Printf("%+v\n", userLogin)
	validateErr := validate.Struct(userLogin)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	result, dbErr := DoesUserExists(dbpool, r.Context(), userLogin.Email, userLogin.Password)
	if dbErr != nil {
		log.Fatalf("userExists: database error: %s\n", dbErr)
		return
	}
	//io.WriteString(w, strconv.FormatBool(result))
	_, sendErr := w.Write([]byte(strconv.FormatBool(result)))
	if sendErr != nil {
		return
	}
	//return result/**/
}

// DoesEmailExistRoute checks if the email exists in the database
func (dbpool *DatabasePool) DoesEmailExistRoute(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	var emailStruct types.Email
	body, readErr := io.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("DoesEmailExistRoute: could not read body: %s\n", readErr)
	}
	jsonErr := json.Unmarshal(body, &emailStruct)
	if jsonErr != nil {
		log.Printf("DoesEmailExistRoute: could not decode json: %s\n", jsonErr)
		// One empty request being sent
		return
	}
	validateErr := validate.Struct(emailStruct)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	emailExists, emailExistsErr := DoesEmailExist(dbpool, r.Context(), emailStruct.Email)
	if emailExistsErr != nil {
		http.Error(w, "Issue with querying Email", http.StatusInternalServerError)
		log.Fatal("DoesEmailExistRoute: Issue with querying Email")
		return
	}
	_, sendErr := w.Write([]byte(strconv.FormatBool(emailExists)))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) DoesPasswordMatch(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	hasPassword := r.URL.Query().Has("password")
	if !hasPassword {
		http.Error(w, "No Password Found Error", http.StatusBadRequest)
		return
	}
	hasEmail := r.URL.Query().Has("email")
	if !hasEmail {
		http.Error(w, "No Email Found Error", http.StatusBadRequest)
		return
	}

	password := r.URL.Query().Get("password")
	email := r.URL.Query().Get("email")
	matches, matchesErr := DoesPasswordMatchDB(dbpool, r.Context(), email, password)

	if matchesErr != nil {
		log.Printf("does-password-match: %s\n", matchesErr)
		http.Error(w, "Issue with matching password", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(strconv.FormatBool(matches)))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) GetUsernameById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	log.Printf("Calling get-username-by-id")
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("get-username-by-id: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by get-username-by-id", http.StatusInternalServerError)
		return
	}
	username, usernameErr := GetUsernameByIdDB(dbpool, r.Context(), decryptedUserId)
	if usernameErr != nil {
		log.Printf("get-username-by-id: could not retrieve username: %s\n", usernameErr)
	}
	_, sendErr := w.Write([]byte(username))
	if sendErr != nil {
		http.Error(w, "Sending Error by get-username-by-id", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) GetEmailById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("get-email-by-id: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by get-email-by-id", http.StatusInternalServerError)
		return
	}
	email, emailErr := GetEmailByIdDB(dbpool, r.Context(), decryptedUserId)
	if emailErr != nil {
		log.Printf("get-email-by-id: could not retrieve username: %s\n", emailErr)
	}
	_, sendErr := w.Write([]byte(email))
	if sendErr != nil {
		http.Error(w, "Sending Error by get-email-by-id", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) DeleteAccountByCookieId(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("delete-account: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by delete-account", http.StatusInternalServerError)
		return
	}
	result, resultErr := DeleteAccountByUserId(dbpool, r.Context(), decryptedUserId)
	if resultErr != nil {
		log.Printf("delete-account: could not decode json: %s\n", resultErr)
		http.Error(w, "Issue with Deleting Account", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(result))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) GetAmountDonatedById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("getAmountDonatedById: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by getAmountDonatedById", http.StatusInternalServerError)
		return
	}
	amountDonated, queryErr := GetAmountDonatedByIdDB(dbpool, r.Context(), decryptedUserId)
	if queryErr != nil {
		log.Printf("getAmountDonatedById: could not decode json: %s\n", queryErr)
		http.Error(w, "Issue with Querying Amount Donated", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(strconv.Itoa(amountDonated)))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) GetTreesPlantedById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("getTreesPlantedById: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by getTreesPlantedById", http.StatusInternalServerError)
		return
	}
	treesPlanted, queryErr := GetTreesPlantedByIdDB(dbpool, r.Context(), decryptedUserId)
	if queryErr != nil {
		log.Printf("getTreesPlantedById: could not decode json: %s\n", queryErr)
		http.Error(w, "Issue with Querying Trees Planted", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(strconv.Itoa(treesPlanted)))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) GetAmountOfNotesById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("getAmountOfNotesById: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by getAmountOfNotesById", http.StatusInternalServerError)
		return
	}
	amountNotes, queryErr := GetAmountOfNotesByIdDB(dbpool, r.Context(), decryptedUserId)
	if queryErr != nil {
		log.Printf("getAmountOfNotesById: could not decode json: %s\n", queryErr)
		http.Error(w, "Issue with Querying Note Amount", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(strconv.Itoa(amountNotes)))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) GetAllNotesById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	w.Header().Set("Content-Type", "application/json")
	decryptedUserId, decryptErr := security.Read(r, "user_id")
	if decryptErr != nil {
		log.Printf("GetAllNotesById: issue with decrypting user_id: %s\n", decryptErr)
		http.Error(w, "Decrypting Error by GetAllNotesById", http.StatusInternalServerError)
		return
	}
	notesByUser, queryErr := GetNotesByIdInDB(dbpool, r.Context(), decryptedUserId)
	if queryErr != nil {
		log.Printf("GetAllNotesById error: %s\n", queryErr)
		http.Error(w, "Query Error by GetAllNotesById", http.StatusInternalServerError)
		return
	}
	err := json.NewEncoder(w).Encode(notesByUser)
	if err != nil {
		log.Printf("GetAllNotesById error: %s\n", queryErr)
		http.Error(w, "Query Error by GetAllNotesById", http.StatusInternalServerError)
		return
	}
}

func (dbpool *DatabasePool) DeleteNoteById(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	hasNoteId := r.URL.Query().Has("noteId")
	if !hasNoteId {
		http.Error(w, "No Note Id Found Error", http.StatusBadRequest)
		log.Printf("Error in DeleteNoteById")
		return
	}
	noteId := r.URL.Query().Get("noteId")
	queryErr := DeleteNoteByNoteIdInDB(dbpool, r.Context(), noteId)
	if queryErr != nil {
		log.Printf("DeleteNoteById error: %s\n", queryErr)
		http.Error(w, "Query Error by DeleteNoteById", http.StatusInternalServerError)
		return
	}
	return
}

func (dbpool *DatabasePool) UpdateNoteTitleByNoteId(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	hasNoteId := r.URL.Query().Has("noteId")
	if !hasNoteId {
		http.Error(w, "No Note Id Found Error", http.StatusBadRequest)
		log.Printf("Error in UpdateNoteTitleByNoteId")
		return
	}
	noteId := r.URL.Query().Get("noteId")

	hasNoteTitle := r.URL.Query().Has("title")
	if !hasNoteTitle {
		http.Error(w, "No Note Title Found Error", http.StatusBadRequest)
		log.Printf("Error in UpdateNoteTitleByNoteId")
		return
	}
	noteTitle := r.URL.Query().Get("title")

	queryErr := UpdateNoteByNoteIdInDB(dbpool, r.Context(), noteId, noteTitle)
	if queryErr != nil {
		log.Printf("UpdateNoteTitleByNoteId error: %s\n", queryErr)
		http.Error(w, "Query Error by UpdateNoteTitleByNoteId", http.StatusInternalServerError)
		return
	}
	return
}

func (dbpool *DatabasePool) UpdateNoteTextByNoteId(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	hasNoteId := r.URL.Query().Has("noteId")
	if !hasNoteId {
		http.Error(w, "No Note Id Found Error", http.StatusBadRequest)
		log.Printf("Error in UpdateNoteTextByNoteId")
		return
	}
	noteId := r.URL.Query().Get("noteId")

	hasNoteText := r.URL.Query().Has("text")
	if !hasNoteText {
		http.Error(w, "No Note Text Found Error", http.StatusBadRequest)
		log.Printf("Error in UpdateNoteTextByNoteId")
		return
	}
	noteText := r.URL.Query().Get("text")
	log.Printf("UpdateNoteTextByNoteId: (Text: %s, Id: %s)\n", noteText, noteId)
	queryErr := UpdateNoteTextByNoteIdInDB(dbpool, r.Context(), noteId, noteText)
	if queryErr != nil {
		log.Printf("UpdateNoteTextByNoteId error: %s\n", queryErr)
		http.Error(w, "Query Error by UpdateNoteTextByNoteId", http.StatusInternalServerError)
		return
	}
	return
}

func (dbpool *DatabasePool) GetNoteTextByNoteId(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, false)
	hasNoteId := r.URL.Query().Has("noteId")
	if !hasNoteId {
		http.Error(w, "No Note Id Found Error", http.StatusBadRequest)
		log.Printf("Error in GetNoteTextByNoteId")
		return
	}
	noteId := r.URL.Query().Get("noteId")
	noteText, queryErr := GetNoteTextByNoteIdInDB(dbpool, r.Context(), noteId)
	if queryErr != nil {
		log.Printf("GetNoteTextByNoteId error: %s\n", queryErr)
		http.Error(w, "Query Error by GetNoteTextByNoteId", http.StatusInternalServerError)
		return
	}
	_, sendErr := w.Write([]byte(noteText))
	if sendErr != nil {
		http.Error(w, "Sending Error", http.StatusInternalServerError)
		return
	}
}

// SetSessionCookieHandler sets the three cookies for when a user logs in or signs up
func (dbpool *DatabasePool) SetSessionCookieHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	// This value is for readability for max age. Max Age uses seconds to represent its expiration time
	hours := 3600

	var emailStruct types.Email
	body, readErr := io.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("set-cookie: could not read body: %s\n", readErr)
	}
	jsonErr := json.Unmarshal(body, &emailStruct)
	if jsonErr != nil {
		log.Printf("set-cookie: could not decode json: %s\n", jsonErr)
		// One empty request being sent
		return
	}
	validateErr := validate.Struct(emailStruct)
	if validateErr != nil {
		handleValidationErr(validateErr)
		http.Error(w, "Invalid Struct Fields", http.StatusBadRequest)
		return
	}
	// Get's uuid
	userId, userIdReadErr := GetUserIdByEmail(dbpool, r.Context(), emailStruct.Email)
	log.Printf("set-cookie: %+v\n", emailStruct)
	log.Printf("set-cookie: userId: %s", userId.String())
	if userIdReadErr != nil {
		log.Printf("set-cookie: %s\n", userIdReadErr)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	stringUUID, convertUUIDToStringErr := userId.MarshalText()

	if convertUUIDToStringErr != nil {
		log.Printf("set-cookie: %s\n", convertUUIDToStringErr)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	userIdCookie := http.Cookie{
		Name:     "user_id",
		Value:    string(stringUUID),
		Path:     "/",
		MaxAge:   hours * 2,
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	userIdWriteErr := security.Write(w, userIdCookie)
	if userIdWriteErr != nil {
		log.Printf("set-cookie: %s\n", userIdWriteErr)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	// Write the cookie. If there is an error (due to an encoding failure or it
	// being too long) then log the error and send a 500 Internal Server Error
	// response.
	bytesCount, byteCountErr := security.GetByteLength()
	if byteCountErr != nil {
		log.Printf("set-cookie: %s\n", byteCountErr)
		http.Error(w, "byte retrieval error", http.StatusInternalServerError)
		return
	}

	randString, randStringErr := security.GenerateRandomString(bytesCount)
	if randStringErr != nil {
		log.Printf("set-cookie: %s\n", randStringErr)
		http.Error(w, "random string generation error", http.StatusInternalServerError)
		return
	}
	authIdCookie := http.Cookie{
		Name:     "secure_id",
		Value:    randString,
		Path:     "/",
		MaxAge:   hours * 2,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	bytes, bytesErr := hex.DecodeString(os.Getenv("AESBLOCKBYTESTRING"))
	if bytesErr != nil {
		log.Printf("set-cookie: %s\n", bytesErr)
		http.Error(w, "byte generation error", http.StatusInternalServerError)
		return
	}

	authIdCookieErr := security.WriteEncrypted(w, authIdCookie, bytes)
	if authIdCookieErr != nil {
		log.Printf("set-cookie: %s\n", authIdCookieErr)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	seshCookie := http.Cookie{
		Name:     "sesh",
		Value:    randString,
		Path:     "/",
		MaxAge:   hours * 2,
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	seshErr := security.Write(w, seshCookie)
	if seshErr != nil {
		log.Printf("set-cookie: %s\n", seshErr)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	//username, usernameErr := GetUsernameByIdDB(dbpool, r.Context(), string(stringUUID))
	//
	//if usernameErr != nil {
	//	log.Printf("set-cookie: %s\n", usernameErr)
	//	http.Error(w, "server error", http.StatusInternalServerError)
	//	return
	//}

	//usernameCookie := http.Cookie{
	//	Name:     "username",
	//	Value:    username,
	//	Path:     "/",
	//	MaxAge:   hours * 2,
	//	HttpOnly: false,
	//	Secure:   true,
	//	SameSite: http.SameSiteLaxMode,
	//}
	//
	//usernameCookieErr := security.Write(w, usernameCookie)
	//if usernameCookieErr != nil {
	//	log.Printf("set-cookie: %s\n", usernameCookieErr)
	//	http.Error(w, "server error", http.StatusInternalServerError)
	//	return
	//}

	// Write a HTTP response as normal.
	w.Write([]byte("cookie set!"))
}

// GetSessionCookieHandler decrypts, decodes or decipher the session cookie
// TODO: Make it so the endpoint takes a body of an enum value for which cookie to decipher
func GetSessionCookieHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	// Send a string value of one of the tokens
	// Also add better error handling please

	bytes, bytesErr := hex.DecodeString(os.Getenv("AESBLOCKBYTESTRING"))
	if bytesErr != nil {
		log.Printf("get-cookie: %s\n", bytesErr)
		http.Error(w, "byte generation error", http.StatusInternalServerError)
		return
	}

	value, err := security.ReadEncrypted(r, "secure_id", bytes)
	if err != nil {
		switch {
		case errors.Is(err, http.ErrNoCookie):
			http.Error(w, "cookie not found", http.StatusBadRequest)
		case errors.Is(err, security.ErrInvalidValue):
			http.Error(w, "invalid cookie", http.StatusBadRequest)
		default:
			log.Println(err)
			http.Error(w, "server error", http.StatusInternalServerError)
		}
		return
	}
	w.Write([]byte(value))
}

func DeleteCookieHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w, true)
	hasCookieName := r.URL.Query().Has("cookie_name")
	if !hasCookieName {
		http.Error(w, "No Password Found Error", http.StatusBadRequest)
		return
	}
	cookieName := r.URL.Query().Get("cookie_name")
	c := &http.Cookie{
		Name:     cookieName,
		Value:    "",
		Path:     "/",
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, c)
}

// enableCors handles the headers for CORS to be accepted
// Useful websites: https://fetch.spec.whatwg.org/#http-cors-protocol
func enableCors(w *http.ResponseWriter, allowCredentials bool) {
	log.Printf(strconv.FormatBool(allowCredentials))
	// TODO: Change later once I get a domain for the website
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	(*w).Header().Set("Access-Control-Allow-Headers", "GET,POST,OPTIONS,HEAD,Content-Type,DELETE")
	//(*w).Header().Set("Access-Control-Request-Headers", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", strconv.FormatBool(allowCredentials))
}

func handleValidationErr(err error) {
	// this check is only needed when your code could produce
	// an invalid value for validation such as interface with nil
	// value most including myself do not usually have code like this.
	var invalidValidationError *validator.ValidationErrors
	if errors.As(err, &invalidValidationError) {
		fmt.Println(err)
		return
	}

	for _, err := range err.(validator.ValidationErrors) {

		fmt.Println(err.Namespace())
		fmt.Println(err.Field())
		fmt.Println(err.StructNamespace())
		fmt.Println(err.StructField())
		fmt.Println(err.Tag())
		fmt.Println(err.ActualTag())
		fmt.Println(err.Kind())
		fmt.Println(err.Type())
		fmt.Println(err.Value())
		fmt.Println(err.Param())
		fmt.Println()
	}

	// from here you can create your own error messages in whatever language you wish
	log.Println("Validation Error Occurred")
	return
}
