package gameserver

// Code retaining to TCP management for the gameserver

import (
	"fmt"
	"net"
)

const (
	CONN_HOST = "localhost"
	CONN_PORT = "3333"
	CONN_TYPE = "tcp"
)

// Listener referneced in main.go set to close when main method ends
var Listener net.Listener

// clients inserted into Game object as users
func InitSocketServer() {
	var err error
	Listener, err = net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
	if err != nil {
		panic(err)
	}
	fmt.Println("Listening on " + CONN_HOST + ":" + CONN_PORT)
	for {
		// Listen for incoming connections
		conn, err := Listener.Accept()
		if err != nil {
			fmt.Println("Error accepting" + err.Error())
			panic(err)
		}

		go handleRequest(conn)
	}

}

// HandleRequest handles incoming tcp requests
func handleRequest(conn net.Conn) {
	// Make a buffer to hold the incoming data
	//buf := make([]byte, 2048)
}
