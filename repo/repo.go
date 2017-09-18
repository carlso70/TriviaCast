package repo

import (
	"errors"
	"fmt"

	"github.com/carlso70/triviacast/user"
)

// TODO implement mongoDB methods to store users
var Users []user.User

func CreateDummyUsers() {
	for i := 0; i < 15; i++ {
		user := user.Init()
		user.Id = i
		AddUserToDB(user)
	}
}

func AddUserToDB(user user.User) error {
	Users = append(Users, user)
	return nil
}

func FindUser(userId int) (user.User, error) {
	for _, user := range Users {
		if user.Id == userId {
			return user, nil
		}
	}
	return user.User{}, errors.New("User not found error")
}

func GetUsers() ([]user.User, error) {
	// TODO add mongoDB implemention
	return Users, nil
}
