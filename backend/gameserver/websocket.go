package gameserver

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients []*websocket.Conn

func AcceptGameSockets(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	clients = append(clients, conn)
	fmt.Println("Client Subscribed")
}

func SendMsg(msg string) {
	fmt.Println("Broadcasting to: ", len(clients))
	for i := len(clients) - 1; i >= 0; i-- {
		if err := clients[i].WriteMessage(websocket.TextMessage, []byte(msg)); err != nil {
			// if there is an error remove client
			clients = append(clients[:i], clients[i+1:]...)
			// TODO something with there error where I remove the user from the game as well
		}
	}
}

func InitWebSocket() {
	clients = make([]*websocket.Conn, 0)
	http.HandleFunc("/game_socket", AcceptGameSockets)
	http.ListenAndServe(":3000", nil)
}
