package game

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/carlso70/triviacast/backend/repo"
	"github.com/carlso70/triviacast/backend/user"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// TODO change the question db, to change Answer an int
type SocketResponse struct {
	UserId int    `json:"userId"`
	GameId int    `json:"gameId"`
	Answer string `json:"answer"`
}

type Client struct {
	Connection  *websocket.Conn
	User        user.User
	currentGame *Game
}

var clients []Client

func (g *Game) AcceptGameSockets(w http.ResponseWriter, r *http.Request) {
	var socketRep SocketResponse

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	_, message, err := conn.ReadMessage()

	// Convert first socket message to get setup client
	err = json.Unmarshal(message, &socketRep)
	if err != nil {
		fmt.Println("Error Unmarshaling json:", err)
		return
	}

	usr, err := repo.FindUser(socketRep.UserId)
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Invalid JSON format"))
		fmt.Println(err)
		return
	}
	// Get a pointer to the game in progress
	client := Client{Connection: conn, User: usr, currentGame: g}
	clients = append(clients, client)

	fmt.Println("Client Subscribed")
	go Listen(client)
}

func Listen(client Client) {
	defer client.Connection.Close()
	for {
		_, message, err := client.Connection.ReadMessage()
		if err != nil {
			fmt.Println("read:", err)
		}
		if len(string(message)) > 0 {
			fmt.Println("Client:", client.User.Username, "Sent Msg:", string(message))
			// Sends the string to the response channel
			client.currentGame.responses <- string(message)
		}
	}
}

func SendMsg(msg string) {
	fmt.Println("Broadcasting to: ", len(clients))
	for i := len(clients) - 1; i >= 0; i-- {
		if err := clients[i].Connection.WriteMessage(websocket.TextMessage, []byte(msg)); err != nil {
			// if there is an error remove client
			clients = append(clients[:i], clients[i+1:]...)
			// TODO remove the user from the game as well if there is a disconnect
		}
	}
}

func (g *Game) InitGameSocket() {
	clients = make([]Client, 0)

	handle := fmt.Sprintf("/game_socket/%d", g.Id)
	http.HandleFunc(handle, g.AcceptGameSockets)
	fmt.Println("Serving on:", handle)
	go http.ListenAndServe(":3000", nil)
}
