package handlers

import (
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/carlso70/triviacast/backend/repo"
	"github.com/carlso70/triviacast/backend/user"
)

type AccountRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var request AccountRequest

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
		w.WriteHeader(422) // Unproccesable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

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
}
