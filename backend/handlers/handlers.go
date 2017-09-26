package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/carlso70/triviacast/backend/gameserver"
)

type GameSessionRequest struct {
	UserId int `json:"userId"`
}

// INDEX welcome
func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome")
}

// StartGame generates a new game, responds back with game id token
func StartGame(w http.ResponseWriter, r *http.Request) {
	var request GameSessionRequest
	// Limit request size
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}

	// Decode json
	if err := json.Unmarshal(body, &request); err != nil {
		w.Header().Set("Content-Type", "application/json;charset=UTF-8")
		w.WriteHeader(422) // Unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

	// Get the gamemanager instance, start new game
	gamemanager := gameserver.GetInstance()
	gameId, err := gamemanager.CreateGame()
	if err != nil {
		panic(err)
	}

	fmt.Fprint(w, gameId)
}

// RequestUsers gets a list of all the users
func ListUsers(w http.ResponseWriter, r *http.Request) {

	// Get the gamemanager instance, get all users
	gamemanager := gameserver.GetInstance()
	users, err := gamemanager.GetUsers()
	if err != nil {
		panic(err)
	}

	for _, user := range users {
		str := "UserID = " + strconv.Itoa(user.Id)
		fmt.Fprint(w, str)
	}
}

// ListGames responds with a list of all the active games
func ListGames(w http.ResponseWriter, r *http.Request) {

	// Get the gamemanager instance, get all active games
	gamemanager := gameserver.GetInstance()
	games := gamemanager.GetGames()

	fmt.Println(games)
	for _, game := range games {
		fmt.Fprint(w, game.Id)
	}

}
