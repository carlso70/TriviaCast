package game

import (
	"errors"
	"fmt"
	"time"

	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

/*
type GameInterface interface {
	AddUserToGame(user *user.User) error
	RemoveUserFromGame(user *user.User) error
	StartGame()
}
*/

type Game struct {
	Id    int         `json:"id"`
	Users []user.User `json:"users"`
}

func Init() Game {
	id := utils.GenerateId()
	return Game{Id: id, Users: nil}
}

func (g *Game) StartGame() error {
	// do initial testing
	/*
		if len(g.Users) <= 0 {
			return errors.New("No user exception, can't start game")
		}
	*/
	go g.runGame()
	return nil
}

func (g *Game) runGame() {
	fmt.Println("Running game:", g.Id)
	ct := 0
	for {
		ct = ct + 1
		time.Sleep(time.Millisecond * 1600)
		if ct > 10 {
			break
		}
	}
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
