package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/carlso70/triviacast/backend/gameserver"
)

type GameSessionRequest struct {
	UserId int `json:"userId"`
	GameId int `json:"gameId"`
}

// CreateGame generates a new game, and adds the user to the game, responds back with game id token
func CreateGame(w http.ResponseWriter, r *http.Request) {
	var request GameSessionRequest

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	// Get the gamemanager instance, create new game, and add user to the game
	gamemanager := gameserver.GetInstance()
	gameId, err := gamemanager.CreateGame()
	gamemanager.AddUserToGame(gameId, request.UserId)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "Added user to game %d\n", gameId)
}

// TODO Refactor methods to increase speed
// StartGame starts running a new game instance, checks if it exists
func StartGame(w http.ResponseWriter, r *http.Request) {
	var request GameSessionRequest

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}

	defer r.Body.Close()
	fmt.Println(request.GameId, request.UserId)

	// Get the gamemanager instance, start new game
	gamemanager := gameserver.GetInstance()
	err = gamemanager.StartGame(request.GameId)
	if err != nil {
		panic(err)
	}
	fmt.Fprint(w, "Success")
}

// JoinGame adds a user to a game with a specific id
func JoinGame(w http.ResponseWriter, r *http.Request) {
	var request GameSessionRequest

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	// Get the gamemanager instance, start new game
	gamemanager := gameserver.GetInstance()
	gamemanager.AddUserToGame(request.GameId, request.UserId)
	if err != nil {
		panic(err)
	}
	fmt.Fprint(w, "Success")
}

// ListGames responds with a list of all the active games
func ListGames(w http.ResponseWriter, r *http.Request) {
	// Get the gamemanager instance, get all active games
	gamemanager := gameserver.GetInstance()
	games := gamemanager.GetGames()

	for _, game := range games {
		// Converts the game to a readable json
		byteSlice, err := json.Marshal(&game)
		if err != nil {
			panic(err)
		}
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}
