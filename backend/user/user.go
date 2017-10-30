package user

import (
	"github.com/carlso70/triviacast/backend/utils"
)

// SessionId is the current gameId
type User struct {
	Id       int    `json:"id" bson:"id"`
	Username string `json:"username" bson:"username"`
	Password string `json:"-" bson:"password"`
	GameId   int    `json:"gameID" bson:"gameId"`
	Score    int    `json:"score" bson:"score"`
	Active   bool   `json:"active" bson:"active"`
	WinCt    int    `json:"wins" bson:"wins"`
}

func Init() User {
	id := utils.GenerateId()
	active := true
	return User{Id: id, Active: active}
}

func CreateUser(id int, username string, password string, gameId int, score int, active bool) User {
	return User{
		Id:       id,
		Username: username,
		Password: password,
		GameId:   gameId,
		Score:    score,
		Active:   active,
	}
}
