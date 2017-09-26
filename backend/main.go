package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/carlso70/triviacast/backend/routing"
)

func main() {
	fmt.Println("Launching Server")

	router := routing.NewRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
