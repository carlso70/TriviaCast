package gameserver

// Code retaining to TCP management for the gameserver
import (
	"encoding/json"
	"fmt"
	"net"

	"github.com/carlso70/triviacast/backend/repo"
)

const (
	CONN_HOST = "0.0.0.0"
	CONN_PORT = "3333"
	CONN_TYPE = "tcp"
)

// TCP request objects, these are for in game
// InGame is a flag set to false if users are requesting to join the TCP client list
type GameRequest struct {
	UserId int  `json:"userId"`
	GameId int  `json:"gameId"`
	InGame bool `json:"inGame"`
}

// Listener referneced in main.go set to close when main method ends
var Listener net.Listener

var clients []Client

// InitSocketServer , clients inserted into Game object as users
func InitSocketServer() {
	Listener, err := net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
	fmt.Println("Listening on ", Listener.Addr().String())
	if err != nil {
		panic(err)
	}

	clients = make([]Client, 0)
	for {
		// Listen for incoming connections
		conn, err := Listener.Accept()
		if err != nil {
			panic(err)
		}
		// Handle connections in a new goroutine
		go handleRequest(conn)
	}
}

func Broadcast() {
	fmt.Println("Broadcasting to: ", len(clients))
	for _, client := range clients {
		if _, err := client.Connection.Write([]byte("Testing Broadcast")); err != nil {
			// If there is an error remove client from client list
			// clients = append(clients[:index], clients[index+1]...)
		}
	}
}

// HandleRequest handles incoming tcp requests
func handleRequest(conn net.Conn) {
	// Make a buffer to hold the incoming data
	buf := make([]byte, 6000)

	// Read the incoming connection into the buffer
	_, err := conn.Read(buf)
	if err != nil {
		panic(err)
	}

	// Parse the request, which should have the userId
	var request GameRequest
	if err := json.Unmarshal(buf, &request); err != nil {
		panic(err)
	}

	if request.InGame {
		// Parse inGame request

	} else {
		// Add the user to the client list
		// Get add the client to the list of clients
		usr, err := repo.FindUser(request.UserId)
		if err != nil {
			conn.Write([]byte("{ \"success\": false }"))
			panic(err)
		}

		client := Client{Connection: conn, User: usr}
		clients = append(clients, client)
		conn.Write([]byte("{ \"success\": true }"))
		fmt.Println(string(buf))
	}
}
