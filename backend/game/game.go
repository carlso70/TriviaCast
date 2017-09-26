package game

import (
	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

type Game struct {
	Id    int         `json:"id"`
	Users []user.User `json:"users"`
}

func Init() Game {
	id := utils.GenerateId()
	return Game{Id: id, Users: nil}
}
