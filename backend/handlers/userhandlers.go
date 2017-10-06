package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/carlso70/triviacast/backend/gamemanager"
	"github.com/carlso70/triviacast/backend/repo"
	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
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

	// password encrypting check user is valid
	if request.Username == "" || request.Password == "" {
		http.Error(w, "Invalid Username or Password", 500)
		return
	}

	// Check if user already exists
	if usr, _ := repo.FindUserByUsername(request.Username); usr.Username != "" {
		http.Error(w, "User already exists", 500)
		return
	}
	usr := user.Init()
	usr.Username = request.Username
	usr.Password = utils.EncryptPass(request.Password)

	if err := repo.AddUserToDB(usr); err != nil {
		panic(err)
	}

	byteSlice, err := json.Marshal(&usr)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

// LoginUser checks the attemped username and password to see if it is a valid request
func LoginUser(w http.ResponseWriter, r *http.Request) {
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

	usr, err := repo.FindUserByUsername(request.Username)
	if err = utils.DecryptPass(request.Password, usr.Password); err != nil {
		// send error response if login failed
		//TODO send correct error code
		http.Error(w, "Invalid Password", 500)
		return
	}
	byteSlice, err := json.Marshal(&usr)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

// RequestUsers gets a list of all the users
func ListUsers(w http.ResponseWriter, r *http.Request) {
	// Get the gamemanager instance, get all users
	gamemanager := gamemanager.GetInstance()
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
