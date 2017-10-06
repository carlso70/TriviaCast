package gameserver

// Code retaining to TCP management for the gameserver
import (
	"fmt"
	"net"
)

const (
	CONN_HOST = "0.0.0.0"
	CONN_PORT = "3333"
	CONN_TYPE = "tcp"
)

// TCP request objects, these are for in game
type RequestObj struct {
	UserId int `json:"userId"`
	GameId int `json:"gameId"`
}

// Listener referneced in main.go set to close when main method ends
var Listener net.Listener

var clients []net.Conn

// InitSocketServer , clients inserted into Game object as users
func InitSocketServer() {
	Listener, err := net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
	fmt.Println("Listening on ", Listener.Addr().String())
	if err != nil {
		panic(err)
	}

	clients = make([]net.Conn, 0)

	for {
		// Listen for incoming connections
		conn, err := Listener.Accept()
		fmt.Println(conn.RemoteAddr())
		clients = append(clients, conn)
		fmt.Println(clients)
		Broadcast()
		if err != nil {
			panic(err)
		}
		// Handle connections in a new goroutine
		go handleRequest(conn)
	}
}

func Broadcast() {
	fmt.Println("Broadcast", len(clients))
	for _, client := range clients {
		if _, err := client.Write([]byte("Testing")); err != nil {
			panic(err)
		}
	}
}

// HandleRequest handles incoming tcp requests
func handleRequest(conn net.Conn) {
	// Make a buffer to hold the incoming data
	buf := make([]byte, 2048)

	// Read the incoming connection into the buffer
	reqLen, err := conn.Read(buf)
	fmt.Println("Message Recieved of len:", reqLen)
	fmt.Println(string(buf))

	if err != nil {
		panic(err)
	}
	// send a response back to person contacting us
	//conn.Write([]byte("Message Receieved"))
	//conn.Close()
}
