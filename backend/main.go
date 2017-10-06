package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/carlso70/triviacast/backend/gamemanager"
	"github.com/carlso70/triviacast/backend/gameserver"
	"github.com/carlso70/triviacast/backend/routing"
)

func main() {
	fmt.Println("Launching Server")

	// GetInstance inits the gamemanager singleton, and the TCP socket server
	gamemanager.GetInstance()

	router := routing.NewRouter()
	go gameserver.InitSocketServer()
	log.Fatal(http.ListenAndServe(":8080", router))
}
