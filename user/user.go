package user

import (
	"github.com/carlso70/triviacast/utils"
)

// SessionId is the current gameId
type User struct {
	Id        int `json:"id"`
	SessionId int `json:"sessionID"`
}

func Init() User {
	id := utils.GenerateId()
	return User{Id: id, SessionId: 0}
}
