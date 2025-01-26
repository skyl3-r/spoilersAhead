package actions

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"backend/database"
)

type Userlike struct {
	Username string `json:"username"`
	Postid   string `json:"postid"`
}

func AddUserlike(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var ul Userlike
	json.NewDecoder(r.Body).Decode(&ul)

	var id string
	err := database.DB.QueryRow(`
		SELECT users.id 
		FROM users 
		WHERE users.username = $1
	`, ul.Username).Scan(&id)

	if err != nil {
		http.Error(w, "Failed to query users", http.StatusInternalServerError)
		return
	}

	// insert
	_, err = database.DB.Exec("INSERT INTO userlikes (postid, userid) VALUES ($1, $2)", ul.Postid, id)
	if err != nil {
		http.Error(w, "Failed to create userlikes.", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Userlike created successfully"))
}

func RemoveUserlike(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var ul Userlike
	json.NewDecoder(r.Body).Decode(&ul)

	var id string
	err := database.DB.QueryRow(`
		SELECT users.id 
		FROM users 
		WHERE users.username = $1
	`, ul.Username).Scan(&id)

	if err != nil {
		http.Error(w, "Failed to query users", http.StatusInternalServerError)
		return
	}

	// insert
	_, err = database.DB.Exec("DELETE FROM userlikes WHERE postid = $1 AND userid = $2", ul.Postid, id)
	if err != nil {
		fmt.Printf("Query failed: %v\n", err)
		http.Error(w, "Failed to delete from userlikes.", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Userlike deleted successfully"))
}

type Usercomment struct {
	Username string `json:"username"`
	Postid   string `json:"postid"`
	Body     string `json:"body"`
}

func AddUsercomment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var uc Usercomment
	json.NewDecoder(r.Body).Decode(&uc)

	var id string
	err := database.DB.QueryRow(`
		SELECT users.id 
		FROM users 
		WHERE users.username = $1
	`, uc.Username).Scan(&id)

	if err != nil {
		http.Error(w, "Failed to query users", http.StatusInternalServerError)
		return
	}

	//need current time
	// insert
	_, err = database.DB.Exec("INSERT INTO usercomments (postid, userid, body, commentdate) VALUES ($1, $2, $3, $4)",
		uc.Postid, id, uc.Body, time.Now().UTC())
	if err != nil {
		fmt.Printf("Query failed: %v\n", err)
		http.Error(w, "Failed to create usercomment.", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Usercomment created successfully"))
}
