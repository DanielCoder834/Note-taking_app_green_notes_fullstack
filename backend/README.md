# Backend Explanation
This readme is meant to explain the backend code, how it works, 
and hopefully help future developers like myself better understand the code
with this overview


## File Structure 
The code for the backend is seperated into three different folders and 
main.go file. 
 - Requests
   - The majority of the application logic happens in the requests
   folder.
   - It delegates the logic of the endpoints to the requests.go file then
   further delegates to the database.go file for anything database logic related
   - We use a database pool in case a need to expand to a concurrent application is necessary. 
   The database pool should only be created once since it is an expensive operation
 - Security
   - The folder where the different way we encrypt, decrypt and hash data
   - For hashing passwords, we use argon2id, the best hashing algorithmn for passwords
   - For encrypting cookies, we use AES-GCM cipher blocks. 
     - You need a random hex string of exactly 32 bytes 
     set in your .env file. 
     - In the future, I hope to add some logic to randomly generate the hex-strings every 24 hours, 
     store them in a secure location, and replace the old value. We would also need to keep track for older tokens so how 
     while not storing too many of the old tokens
 - Types
   - Contains the different types used in the application. Mainly
   used for representing the json bodies passed to the requests
 - Main.go
   - Where the program starts and ends. Handles managing the state of the program

# Terminal Commands  
The only command you should know to run the backend is `make server`. It is 
the same as `go run main.go` currently. 

To install all library (I have never run this command. Thank you Goland)
is `go get -u -v -f all` according to: https://stackoverflow.com/questions/32758235/how-to-get-all-dependency-files-for-a-program

If this doesn't work, you can `go get <name of package>` the 
golang libraries individually. They are listed below and in the go.mod (in the first require call. The ones **WITHOUT** `// indirect`)

# Libraries + Technologies 
The majority of external technologies we use are external technologies.
The list of technologies and libraries are: 
- Golang 
- Postgres 
- Golang libraries 
  - Pgx (Golang queries to postgres)
  - Gofrs Uuid (Represents uuids in postgres)
  - Argon2id (Hashing data)
  - Godotenv (Loads env file)

# Heads Up 
So this is a lot, but it should cover 95% of the codebases pitfalls. 
- Just handle the errors properly with http status codes and logging them internally. 
- Name values, functions, folders and files well.
- Watch out for cyclically importing 
- For big structs or types take in their references
- Prints errors if there is a problem with the database
- Also, I keep on getting an extra empty request from the website 
I presume this a CORS pre-flight message. For now, we can ignore, but 
later it should be handled properly with a handshake of some sort, I assume, I don't know. 
- Currently, there is test user with an email of "e", username of "u", and password of "p" 
for testing and development
- **THIS IS SUPER IMPORTANT**: I have a go-routine that handles the server
shut down `handleSIGINT`. I am using a macbook m1, so I am not sure it works on other OS or architectures. 
If you hear your fans spinning and feel your computer heating like flamethrower. **CLOSE THE TERMINAL and 
RESTART YOUR COMPUTER**
- Don't spawn too many go-routines (also you have insurance on your computer)
and good luck coding
