package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/carlso70/triviacast/backend/gameserver"
	"github.com/carlso70/triviacast/backend/routing"
)

const (
	CONN_HOST = "localhost"
	CONN_PORT = "3333"
	CONN_TYPE = "tcp"
)

func main() {
	fmt.Println("Launching Server")

	// GetInstance inits the gamemanager singleton, and the TCP socket server
	gameserver.GetInstance()

	router := routing.NewRouter()
	go gameserver.InitSocketServer()

	fmt.Println("Testin")
	log.Fatal(http.ListenAndServe(":8080", router))
}
