package signup

import (
	"encoding/json"
	"net/http"

	"backend/database"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var u User
	json.NewDecoder(r.Body).Decode(&u)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Use the shared database connection
	_, err = database.DB.Exec("INSERT INTO users (username, password) VALUES ($1, $2)", u.Username, hashedPassword)
	if err != nil {
		http.Error(w, "Failed to create user. Username may already exist.", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))

	// w.Header().Set("Content-Type", "application/json")
	// // fmt.Printf("The request body is %v\n", r.Body)

	// var u User
	// json.NewDecoder(r.Body).Decode(&u)
	// // fmt.Printf("The user request value %v", u)

	// var storedPassword string
	// err := database.DB.QueryRow("SELECT password FROM users WHERE username = $1", u.Username).Scan(&storedPassword)
	// if err != nil {
	// 	if err == sql.ErrNoRows {
	// 		w.WriteHeader(http.StatusUnauthorized)
	// 		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid credentials"})
	// 	} else {
	// 		w.WriteHeader(http.StatusInternalServerError)
	// 		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
	// 		// fmt.Fprint(w, "Database error")
	// 	}
	// 	return
	// }

	// // change this later to use bcrypt
	// if storedPassword != u.Password {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	json.NewEncoder(w).Encode(map[string]string{"error": "Invalid credentials"})
	// 	return
	// }

	// tokenString, err := CreateToken(u.Username)
	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	// fmt.Errorf("No username found")
	// 	json.NewEncoder(w).Encode(map[string]string{"error": "Error creating token"})
	// 	return
	// }
	// w.WriteHeader(http.StatusOK)
	// // fmt.Fprint(w, tokenString)
	// json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
	// return
}
