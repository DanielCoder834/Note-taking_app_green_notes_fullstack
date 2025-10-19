package requests

import (
	"context"
	"fmt"
	"github.com/alexedwards/argon2id"
	"github.com/gofrs/uuid/v5"
	pgxuuid "github.com/jackc/pgx-gofrs-uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"green-notes-backend/types"
	"log"
	"os"
)

type Notes struct {
	Title   string
	NoteKey string
}

// ConnectDb connects the database to the server
// Add this to anything that calls this function
// defer dbpool.Close()
func ConnectDb() *pgxpool.Pool {
	envErr := godotenv.Load()
	if envErr != nil {
		fmt.Print(envErr)
	}
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASEURL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	// Registering the uuid
	dbconfig, err := pgxpool.ParseConfig(os.Getenv("DATABASEURL"))
	if err != nil {
		fmt.Printf("Oh no: %s\n", err)
		// handle error
	}
	dbconfig.AfterConnect = func(ctx context.Context, conn *pgx.Conn) error {
		pgxuuid.Register(conn.TypeMap())
		return nil
	}

	return dbpool
}

// SetUpTables creates all the tables for the database
// Will be helpful with docker in the future
func SetUpTables(dbpool *DatabasePool, ctx context.Context) error {
	userTableQuery := `BEGIN; CREATE TABLE IF NOT EXISTS "user" (` +
		`user_id UUID primary key, ` +
		`username varchar(1000) NOT NULL, ` +
		`email varchar(1000) NOT NULL CONSTRAINT uq_email_constraint UNIQUE, ` +
		`password varchar(1000) NOT NULL,` +
		`amount_donated integer NOT NULL DEFAULT 0,` +
		`trees_planted integer NOT NULL DEFAULT 0` +
		`);`
	notesTableQuery := `CREATE TABLE IF NOT EXISTS "notes" (` +
		`notes_id varchar(10000) primary key, ` +
		`title varchar(1000) NOT NULL, ` +
		`note_text text NOT NULL DEFAULT '',` +
		`user_id UUID NOT NULL, ` +
		`creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP` +
		`); COMMIT;`
	query := userTableQuery + notesTableQuery
	_, err := dbpool.Db.Exec(ctx, query)
	if err != nil {
		fmt.Println(err)
		return fmt.Errorf("unable to create table: %w", err)
	}
	InsertUser(
		dbpool,
		ctx,
		types.UserSignUp{
			Username: "u",
			Password: "p",
			Email:    "e@example.com",
		},
	)
	return nil
}

// DropTables drops each of the tables in the database
// Should removed once development is finished
// Could be used for testing
func DropTables(dbpool *DatabasePool, ctx context.Context) error {
	userTableQuery := `BEGIN; DROP TABLE IF EXISTS "user";`
	noteTableQuery := `DROP TABLE IF EXISTS "notes"; COMMIT;`
	query := userTableQuery + noteTableQuery
	_, err := dbpool.Db.Exec(ctx, query)
	if err != nil {
		return fmt.Errorf("unable to create table: %w", err)
	}
	fmt.Println()
	fmt.Println("Dropped Those Tables :)")
	return nil
}

// InsertUser inserts a new user to the database
func InsertUser(dbpool *DatabasePool, ctx context.Context, message types.UserSignUp) error {
	hashedPassword, hashErr := argon2id.CreateHash(message.Password, argon2id.DefaultParams)
	if hashErr != nil {
		log.Fatal(hashErr)
	}
	//ON CONFLICT DO NOTHING
	query := `INSERT INTO "user" (user_id, username, email, password) VALUES (@Id, @Username, @Email, @Password);`
	userUuid, err2 := uuid.NewV4()
	if err2 != nil {
		fmt.Printf("Error HEre: %s\n\n", err2)
		return nil
	}
	args := pgx.NamedArgs{
		"Id":       userUuid,
		"Username": message.Username,
		"Password": hashedPassword,
		"Email":    message.Email,
	}
	_, err := dbpool.Db.Exec(ctx, query, args)
	if err != nil {
		fmt.Println(err)
		return fmt.Errorf("unable to insert user: %w", err)
	}
	return nil
}

func InsertNote(dbpool *DatabasePool, ctx context.Context, noteKey string, title string, userId string) error {
	//ON CONFLICT DO NOTHING
	// TODO: Check for uniqueness of title on a user to user basis
	noteUuid, noteUuidErr := uuid.FromString(noteKey)
	if noteUuidErr != nil {
		fmt.Println(noteUuidErr)
		return fmt.Errorf("unable to insert note: %w", noteUuidErr)
	}
	query := `INSERT INTO "notes" (notes_id, title, user_id) VALUES (@NoteId, @Title, @UserId);`
	args := pgx.NamedArgs{
		"NoteId": noteUuid,
		"Title":  title,
		"UserId": userId,
	}
	_, err := dbpool.Db.Exec(ctx, query, args)
	if err != nil {
		fmt.Println(err)
		return fmt.Errorf("unable to insert note: %w", err)
	}
	//return nil
	return nil
}

func UpdatePasswordByEmailDb(dbpool *DatabasePool, ctx context.Context, email string, password string) (string, error) {
	hashedPassword, hashErr := argon2id.CreateHash(password, argon2id.DefaultParams)
	if hashErr != nil {
		log.Fatal(hashErr)
	}
	args := pgx.NamedArgs{
		"Password": hashedPassword,
		"Email":    email,
	}
	query := `UPDATE "user" SET Password = @Password WHERE EMAIL = @Email;`
	result, err := dbpool.Db.Exec(ctx, query, args)
	if err != nil {
		fmt.Println(err)
		return "", fmt.Errorf("unable to update password: %w", err)
	}

	// handle case when no passwords are updated
	return result.String(), nil
}

func UpdateEmailByEmailDb(dbpool *DatabasePool, ctx context.Context, email string, newEmail string) (string, error) {
	args := pgx.NamedArgs{
		"NewEmail": newEmail,
		"Email":    email,
	}
	query := `UPDATE "user" SET Email = @NewEmail WHERE EMAIL = @Email;`
	result, err := dbpool.Db.Exec(ctx, query, args)
	if err != nil {
		fmt.Println(err)
		return "", fmt.Errorf("unable to update email: %w", err)
	}

	// handle case when no emails are updated
	return result.String(), nil
}

func UpdateUsernameByEmailDb(dbpool *DatabasePool, ctx context.Context, email string, username string) (string, error) {
	args := pgx.NamedArgs{
		"Username": username,
		"Email":    email,
	}
	query := `UPDATE "user" SET Username = @Username WHERE EMAIL = @Email;`
	result, err := dbpool.Db.Exec(ctx, query, args)
	if err != nil {
		fmt.Println(err)
		return "", fmt.Errorf("unable to update email: %w", err)
	}

	// handle case when no usernames are updated
	return result.String(), nil
}

// DoesUserExists checks the existence of a user
// Emails are unique, so we just check the email exists
// Then double-check the password stored and passed in (could be maybe removed in the future)
func DoesUserExists(dbpool *DatabasePool, ctx context.Context, email string, password string) (bool, error) {
	emailExists, emailError := DoesEmailExist(dbpool, ctx, email)
	if emailError != nil {
		return false, emailError
	}
	if !emailExists {
		return false, nil
	}
	match, matchErr := DoesPasswordMatchDB(dbpool, ctx, email, password)
	if matchErr != nil {
		return false, matchErr
	}
	return emailExists && match, nil
}

// DoesEmailExist Checks if an email exists in the database
// Casts into a boolean, could just do a select 1 from "user" Where email = @Email and then check if the value is null?
// This works, so I am not going to change it until necessary
func DoesEmailExist(dbpool *DatabasePool, ctx context.Context, email string) (bool, error) {
	// Email existence logic
	var emailExists bool
	existanceQuery := `SELECT (EXISTS(SELECT 1 FROM "user" WHERE email = @Email))::bool;`
	args := pgx.NamedArgs{
		"Email": email,
	}
	emailQueryErr := dbpool.Db.QueryRow(ctx, existanceQuery, args).Scan(&emailExists)
	//defer res.Close()
	if emailQueryErr != nil {
		fmt.Println(emailQueryErr)
		return false, fmt.Errorf("unable to query email existance: %w", emailQueryErr)
	}
	return emailExists, nil
}

func DoesPasswordMatchDB(dbpool *DatabasePool, ctx context.Context, email string, password string) (bool, error) {
	args := pgx.NamedArgs{
		"Email": email,
	}
	var databaseEncryptedPassword string
	passwordQuery := `SELECT password FROM "user" where email = @Email LIMIT 1`
	passwordQueryErr := dbpool.Db.QueryRow(ctx, passwordQuery, args).Scan(&databaseEncryptedPassword)
	if passwordQueryErr != nil {
		fmt.Println("\"unable to query password")
		return false, fmt.Errorf("unable to query password: %w", passwordQueryErr)
	}

	match, compareHashErr := argon2id.ComparePasswordAndHash(password, databaseEncryptedPassword)
	if compareHashErr != nil {
		fmt.Println("issue with comparing hashes")
		return false, fmt.Errorf("issue with comparing hashe: %w", compareHashErr)
	}
	return match, nil
}

// GetUserIdByEmail gets the user id by the email since emails are unique
func GetUserIdByEmail(dbpool *DatabasePool, ctx context.Context, email string) (uuid.UUID, error) {
	var userId uuid.UUID
	gettingUserIdByEmailQuery := `SELECT user_id FROM "user" WHERE email = @Email`
	args := pgx.NamedArgs{
		"Email": email,
	}
	userIdQueryErr := dbpool.Db.QueryRow(ctx, gettingUserIdByEmailQuery, args).Scan(&userId)
	if userIdQueryErr != nil {
		log.Printf("get-user-by-id: %s\n", userIdQueryErr)
		// todo: log all rows
		rows, _ := dbpool.Db.Query(ctx, `SELECT * FROM "user"`)
		var id string
		var user string
		var email string
		var pass string
		_, err := pgx.ForEachRow(rows, []any{&id, &user, &email, &pass}, func() error {
			log.Printf("id: %s\n", id)
			log.Printf("user: %s\n", user)
			log.Printf("email: %s\n", email)
			log.Printf("pass: %s\n", pass)
			return nil
		})
		if err != nil {
			log.Printf("err: %s\n", err)
		}
		return uuid.FromStringOrNil(""), userIdQueryErr
	}
	return userId, nil
}

func GetUsernameByIdDB(dbpool *DatabasePool, ctx context.Context, userId string) (string, error) {
	var username string
	gettingUsernameByIdQuery := `SELECT username FROM "user" where user_id = @UserId`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	usernameQueryErr := dbpool.Db.QueryRow(ctx, gettingUsernameByIdQuery, args).Scan(&username)
	if usernameQueryErr != nil {
		fmt.Println(usernameQueryErr)
		return "", fmt.Errorf("unable to query username: %w", usernameQueryErr)
	}
	return username, nil
}

func GetEmailByIdDB(dbpool *DatabasePool, ctx context.Context, userId string) (string, error) {
	var email string
	gettingEmailByIdQuery := `SELECT email FROM "user" where user_id = @UserId`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	emailQueryErr := dbpool.Db.QueryRow(ctx, gettingEmailByIdQuery, args).Scan(&email)
	if emailQueryErr != nil {
		fmt.Println(emailQueryErr)
		return "", fmt.Errorf("unable to query email: %w", emailQueryErr)
	}
	return email, nil
}

func DeleteAccountByUserId(dbpool *DatabasePool, ctx context.Context, userId string) (string, error) {
	query := `DELETE FROM "user" WHERE user_id = @UserId;`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	result, err := dbpool.Db.Exec(ctx, query, args)
	if err != nil {
		log.Printf("delete-err: %s\n", err)
		return "", err
	}
	return result.String(), nil
}

func GetAmountDonatedByIdDB(dbpool *DatabasePool, ctx context.Context, userId string) (int, error) {
	var amountDonated int
	gettingAmountDonatedByIdQuery := `SELECT amount_donated FROM "user" where user_id = @UserId`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	queryErr := dbpool.Db.QueryRow(ctx, gettingAmountDonatedByIdQuery, args).Scan(&amountDonated)
	if queryErr != nil {
		log.Printf("query-err: %s\n", queryErr)
		return 0, queryErr
	}
	return amountDonated, nil
}

func GetTreesPlantedByIdDB(dbpool *DatabasePool, ctx context.Context, userId string) (int, error) {
	var treesPlanted int
	gettingTreesPlantedByIdQuery := `SELECT trees_planted FROM "user" where user_id = @UserId`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	queryErr := dbpool.Db.QueryRow(ctx, gettingTreesPlantedByIdQuery, args).Scan(&treesPlanted)
	if queryErr != nil {
		log.Printf("query-err: %s\n", queryErr)
		return 0, queryErr
	}
	return treesPlanted, nil
}

func GetAmountOfNotesByIdDB(dbpool *DatabasePool, ctx context.Context, userId string) (int, error) {
	var amountOfNotes int
	gettingAmountOfNotes := `SELECT COUNT(*) FROM notes
    LEFT JOIN "user" ON "user"."user_id" = notes."user_id" AND notes."user_id" = @UserId;`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	queryErr := dbpool.Db.QueryRow(ctx, gettingAmountOfNotes, args).Scan(&amountOfNotes)
	if queryErr != nil {
		log.Printf("query-err: %s\n", queryErr)
		return 0, queryErr
	}
	return amountOfNotes, nil
}

func GetNotesByIdInDB(dbpool *DatabasePool, ctx context.Context, userId string) ([]Notes, error) {
	gettingNotesQuery := `SELECT notes.title as title, notes.notes_id as noteKey FROM notes
    LEFT JOIN "user" ON "user"."user_id" = notes."user_id" AND notes."user_id" = @UserId
	ORDER BY "creation_date";`
	args := pgx.NamedArgs{
		"UserId": userId,
	}
	noteRows, queryErr := dbpool.Db.Query(ctx, gettingNotesQuery, args)
	if queryErr != nil {
		return nil, queryErr
	}
	notes, err := pgx.CollectRows(noteRows, pgx.RowToStructByPos[Notes])
	if err != nil {
		return nil, err
	}

	log.Println(notes)

	return notes, nil
}

func DeleteNoteByNoteIdInDB(dbpool *DatabasePool, ctx context.Context, noteId string) error {
	deletingNoteQuery := `DELETE FROM notes WHERE notes_id=@NotesId;`
	args := pgx.NamedArgs{
		"NotesId": noteId,
	}
	_, err := dbpool.Db.Exec(ctx, deletingNoteQuery, args)
	if err != nil {
		log.Printf("delete-err: %s\n", err)
		return err
	}
	return nil
}

func UpdateNoteByNoteIdInDB(dbpool *DatabasePool, ctx context.Context, noteId string, noteTitle string) error {
	updatingNoteTitleQuery := `UPDATE notes
							SET title = @Title
							WHERE notes_id = @NotesId;`
	args := pgx.NamedArgs{
		"Title":   noteTitle,
		"NotesId": noteId,
	}
	_, err := dbpool.Db.Exec(ctx, updatingNoteTitleQuery, args)
	if err != nil {
		log.Printf("update-err: %s\n", err)
		return err
	}
	return nil
}

func UpdateNoteTextByNoteIdInDB(dbpool *DatabasePool, ctx context.Context, noteId string, noteText string) error {
	updatingNoteTextQuery := `UPDATE notes
							SET note_text = @Text
							WHERE notes_id = @NotesId;`
	args := pgx.NamedArgs{
		"Text":    noteText,
		"NotesId": noteId,
	}
	_, err := dbpool.Db.Exec(ctx, updatingNoteTextQuery, args)
	if err != nil {
		log.Printf("update-err: %s\n", err)
		return err
	}
	return nil
}

func GetNoteTextByNoteIdInDB(dbpool *DatabasePool, ctx context.Context, noteId string) (string, error) {
	var noteText string
	gettingNoteTextQuery := `SELECT note_text 
							FROM notes 
							WHERE notes_id = @NotesId;`
	args := pgx.NamedArgs{
		"NotesId": noteId,
	}
	err := dbpool.Db.QueryRow(ctx, gettingNoteTextQuery, args).Scan(&noteText)
	if err != nil {
		log.Printf("update-err: %s\n", err)
		return "", err
	}
	return noteText, nil
}
