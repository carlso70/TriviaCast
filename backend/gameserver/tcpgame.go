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

// List of connections
var activeConn []net.Conn
var deadConn []net.Conn

// InitSocketServer , clients inserted into Game object as users
func InitSocketServer() {
	Listener, err := net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
	fmt.Println("Listening on ", Listener.Addr().String())
	if err != nil {
		panic(err)
	}
	for {
		// Listen for incoming connections
		conn, err := Listener.Accept()
		fmt.Println(conn.RemoteAddr())
		if err != nil {
			panic(err)
		}
		// Handle connections in a new goroutine
		go handleRequest(conn)
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
	conn.Write([]byte("Message Receieved"))
	conn.Close()
}
