package main

import (
	"backend/database"
	"backend/login"
	"backend/signup"
	"log"
	"net/http"
)

// func handler(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
// 	fmt.Fprintln(w, "Hello from Go backend")
// }

// func main() {
// 	http.HandleFunc("/", handler)
// 	http.ListenAndServe(":8080", nil)
// }

func main() {
	// handler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
	// 	// Set CORS headers
	// 	rw.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	// 	rw.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	// 	rw.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// 	// Handle preflight requests
	// 	if req.Method == http.MethodOptions {
	// 		rw.WriteHeader(http.StatusNoContent)
	// 		return
	// 	}

	// 	resp := []byte(`{"status": "ok"}`)
	// 	rw.Header().Set("Content-Type", "application/json")
	// 	rw.Header().Set("Content-Length", fmt.Sprint(len(resp)))
	// 	rw.Write(resp)
	// })
	database.Init()

	http.HandleFunc("/api/login", login.LoginHandler)
	http.HandleFunc("/api/signup", signup.SignupHandler)
	log.Println("Server is available at http://localhost:8000")
	// log.Fatal(http.ListenAndServe(":8000", handler))
	log.Fatal(http.ListenAndServe(":8000", nil))
}
