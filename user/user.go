package user

import (
	"github.com/carlso70/triviacast/utils"
)

// SessionId is the current gameId
type User struct {
	Id        int    `json:"id" bson:"id"`
	Username  string `json:"username" bson:"username"`
	password  string `json:"password" bson:"password"`
	SessionId int    `json:"sessionID" bson:"sessionId"`
}

func Init() User {
	id := utils.GenerateId()
	return User{Id: id, SessionId: 0}
}
