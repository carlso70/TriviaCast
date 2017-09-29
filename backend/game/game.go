package game

import (
	"errors"

	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

type GameInterface interface {
	AddUserToGame(user *user.User) error
	RemoveUserFromGame(user *user.User) error
}

type Game struct {
	Id    int         `json:"id"`
	Users []user.User `json:"users"`
}

func Init() Game {
	id := utils.GenerateId()
	return Game{Id: id, Users: nil}
}

// AddUserToGame checks if the user is in the game, if it is then append to game slice
func (g *Game) AddUserToGame(user user.User) error {
	for _, usr := range g.Users {
		if usr.Id == user.Id {
			return errors.New("Error: User already in game")
		}
	}

	// Set the id of the users gameId to the id of the game
	user.GameId = g.Id
	// Dereference the user point and append it to current game slice
	g.Users = append(g.Users, user)
	return nil
}

// RemoveUserFromGame will remove a specific user from the game if it is exists
func (g *Game) RemoveUserFromGame(user user.User) error {
	for key, usr := range g.Users {
		if usr.Id == user.Id {
			// if the user is the game, remove
			g.Users = append(g.Users[:key], g.Users[key+1:]...)
			return nil
		}
	}

	return errors.New("Error: Failure to delete, user not in game")
}
