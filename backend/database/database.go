package database

import (
	"database/sql"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"net/http"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var (
	DB *sql.DB
)

func Init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	connStr := fmt.Sprintf("postgres://%s:%s@localhost/%s?sslmode=disable", dbUser, dbPassword, dbName)
	var dbErr error
	DB, dbErr = sql.Open("postgres", connStr)
	if dbErr != nil {
		log.Fatal("Failed to connect to the database:", dbErr)
	}
	// Test the connection
	if err := DB.Ping(); err != nil {
		log.Fatal("Failed to ping the database:", err)
	}
	fmt.Println("Successfully connected to the database!")
}

func Seed(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	DB.Exec(`DROP TABLE usercomments;
DROP TABLE userlikes;
DROP TABLE posts;
DROP TABLE fandoms;
DROP TABLE users;`)

	DB.Exec(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fandoms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    posterid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fandomid UUID NOT NULL REFERENCES fandoms(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    postdate TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS userlikes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    postid UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usercomments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    postid UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    commentdate TIMESTAMP NOT NULL
);`)

	userfile, err := os.Open("users.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer userfile.Close()
	fandomfile, err := os.Open("fandoms.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer fandomfile.Close()
	postfile, err := os.Open("posts.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer postfile.Close()
	userlikefile, err := os.Open("userlikes.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer userlikefile.Close()
	usercommentfile, err := os.Open("usercomments.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer usercommentfile.Close()

	// create reader
	userreader := csv.NewReader(userfile)
	lineNumber := 0
	records := make([][]string, 0)

	for {
		record, err := userreader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("err while reading CSV file: %s", err)
		}
		if lineNumber == 0 {
			lineNumber++
			continue
		}
		lineNumber++
		records = append(records, record)
	}
	// add users to db
	for _, v := range records {
		if len(v) != 3 {
			// malformation of file ignore record
			continue
		}
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(v[2]), bcrypt.DefaultCost)
		_, _ = DB.Exec("INSERT INTO users (id, username, password) VALUES ($1, $2, $3)", v[0], v[1], hashedPassword)
	}

	// create reader
	fandomreader := csv.NewReader(fandomfile)
	lineNumber = 0
	records = make([][]string, 0)

	for {
		record, err := fandomreader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("err while reading CSV file: %s", err)
		}
		if lineNumber == 0 {
			lineNumber++
			continue
		}
		lineNumber++
		records = append(records, record)
	}
	// add users to db
	for _, v := range records {
		if len(v) != 2 {
			// malformation of file ignore record
			continue
		}
		_, _ = DB.Exec("INSERT INTO fandoms (id, name) VALUES ($1, $2)", v[0], v[1])
	}
	// create reader
	postreader := csv.NewReader(postfile)
	postreader.LazyQuotes = true
	lineNumber = 0
	records = make([][]string, 0)

	for {
		record, err := postreader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("err while reading CSV file: %s", err)
		}
		if lineNumber == 0 {
			lineNumber++
			continue
		}
		lineNumber++
		records = append(records, record)
	}
	// add users to db
	for _, v := range records {
		if len(v) != 6 {
			// malformation of file ignore record
			continue
		}
		// fmt.Printf("INSERT INTO posts (id, posterid, fandomid, title, body, postdate) VALUES (%s, %s, %s, %s, %s, %s);", v[0], v[1], v[2], v[3], v[4], v[5])
		_, err = DB.Exec("INSERT INTO posts (id, posterid, fandomid, title, body, postdate) VALUES ($1, $2, $3, $4, $5, $6);", v[0], v[1], v[2], v[3], v[4], v[5])
		// if err != nil {
		// 	fmt.Println(err)
		// 	return
		// }
	}
	// create reader
	userlikereader := csv.NewReader(userlikefile)
	lineNumber = 0
	records = make([][]string, 0)

	for {
		record, err := userlikereader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("err while reading CSV file: %s", err)
		}
		if lineNumber == 0 {
			lineNumber++
			continue
		}
		lineNumber++
		records = append(records, record)
	}
	// add users to db
	for _, v := range records {
		if len(v) != 3 {
			// malformation of file ignore record
			continue
		}
		_, _ = DB.Exec("INSERT INTO userlikes (id, postid, userid) VALUES ($1, $2, $3)", v[0], v[1], v[2])
	}
	// create reader
	usercommentreader := csv.NewReader(usercommentfile)
	usercommentreader.LazyQuotes = true
	lineNumber = 0
	records = make([][]string, 0)

	for {
		record, err := usercommentreader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("err while reading CSV file: %s", err)
		}
		if lineNumber == 0 {
			lineNumber++
			continue
		}
		lineNumber++
		records = append(records, record)
	}
	// add users to db
	for _, v := range records {
		if len(v) != 5 {
			// malformation of file ignore record
			continue
		}
		_, _ = DB.Exec("INSERT INTO usercomments (id, postid, userid, body, commentdate) VALUES ($1, $2, $3, $4, $5)", v[0], v[1], v[2], v[3], v[4])
	}
	w.WriteHeader(http.StatusOK)
	// fmt.Fprint(w, tokenString)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

type Fandom struct {
	Name  string `json:"name"`
	Count int    `json:"count"`
}

func GetTopFandomsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	rows, err := DB.Query(`
		SELECT f.name, COUNT(p.id) AS post_count
		FROM fandoms f
		JOIN posts p ON f.id = p.fandomid
		GROUP BY f.name
		ORDER BY post_count DESC
		LIMIT 4;
	`)

	if err != nil {
		http.Error(w, "Failed to query top fandoms", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var fandoms []Fandom
	for rows.Next() {
		var fandom Fandom
		if err := rows.Scan(&fandom.Name, &fandom.Count); err != nil {
			http.Error(w, "Failed to scan fandom data", http.StatusInternalServerError)
			return
		}
		fandoms = append(fandoms, fandom)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(fandoms)
}
