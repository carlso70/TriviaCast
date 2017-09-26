package game

import (
	"github.com/carlso70/triviacast/user"
	"github.com/carlso70/triviacast/utils"
)

type Game struct {
	Id    int         `json:"id"`
	Users []user.User `json:"users"`
}

func Init() Game {
	id := utils.GenerateId()
	return Game{Id: id, Users: nil}
}
