package main

import (
	"log"
	"net/http"

	"github.com/carlso70/triviacast/repo"
	"github.com/carlso70/triviacast/routing"
)

func main() {
	router := routing.NewRouter()
	repo.CreateDummyUsers()

	log.Fatal(http.ListenAndServe(":8080", router))
}
