package login

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"backend/database"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

// based on tutorial from https://medium.com/@cheickzida/golang-implementing-jwt-token-authentication-bba9bfd84d60
// but heavily edited for my use
var (
	secretKey []byte
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.Init()

	secretKey = []byte(os.Getenv("SECRET_KEY"))
	if len(secretKey) == 0 {
		panic("SECRET_KEY not set in environment")
	}
}

func CreateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", nil
	}
	return tokenString, nil
}

func verifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("Invalid token")
	}
	return nil
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	// fmt.Printf("The request body is %v\n", r.Body)

	var u User
	json.NewDecoder(r.Body).Decode(&u)
	// fmt.Printf("The user request value %v", u)

	var storedPassword string
	err := database.DB.QueryRow("SELECT password FROM users WHERE username = $1", u.Username).Scan(&storedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"error": "Invalid credentials"})
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
			// fmt.Fprint(w, "Database error")
		}
		return
	}

	// change this later to use bcrypt
	if storedPassword != u.Password {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid credentials"})
		return
	}

	tokenString, err := CreateToken(u.Username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		// fmt.Errorf("No username found")
		json.NewEncoder(w).Encode(map[string]string{"error": "Error creating token"})
		return
	}
	w.WriteHeader(http.StatusOK)
	// fmt.Fprint(w, tokenString)
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
	return

	// if u.Username == "Admin" && u.Password == "123456" {
	// 	tokenString, err := CreateToken(u.Username)
	// 	if err != nil {
	// 		w.WriteHeader(http.StatusInternalServerError)
	// 		fmt.Errorf("No username found")
	// 	}
	// 	w.WriteHeader(http.StatusOK)
	// 	// fmt.Fprint(w, tokenString)
	// 	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
	// 	return
	// } else {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	// fmt.Fprint(w, "Invalid credentials")
	// 	json.NewEncoder(w).Encode(map[string]string{"error": "Invalid credentials"})
	// }
}
