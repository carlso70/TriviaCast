package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/carlso70/triviacast/backend/gameserver"
	"github.com/carlso70/triviacast/backend/repo"
	"github.com/carlso70/triviacast/backend/user"
)

type AccountRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var request AccountRequest

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	fmt.Println("username: ", request.Username)

	// TODO password encrypting check user is valid
	if request.Username == "" || request.Password == "" {
		panic(errors.New("Empty username/password in CreateUser"))
	}
	usr := user.Init()
	usr.Username = request.Username
	usr.Password = request.Password
	if err := repo.AddUserToDB(usr); err != nil {
		panic(err)
	}

	byteSlice, err := json.Marshal(&usr)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "%s", string(byteSlice))
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
		byteSlice, err := json.Marshal(&user)
		if err != nil {
			panic(err)
		}
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}
