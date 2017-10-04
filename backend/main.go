package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/carlso70/triviacast/backend/gameserver"
	"github.com/carlso70/triviacast/backend/routing"
)

func main() {
	fmt.Println("Launching Server")

	// GetInstance inits the gamemanager singleton, and the TCP socket server
	gameserver.GetInstance()
	if gameserver.Listener != nil {
		defer gameserver.Listener.Close()
	} else {
		panic(errors.New("Listener NOT STARTED"))
	}
	router := routing.NewRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
