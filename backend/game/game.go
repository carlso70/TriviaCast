package game

import (
	"errors"
	"fmt"
	"time"

	"github.com/carlso70/triviacast/backend/question"
	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

type Game struct {
	Id           int         `json:"id"`
	Users        []user.User `json:"users"`
	QuestionDeck []question.Question
	Scoreboard   map[string]int
	Winner       string
}

func Init() Game {
	id := utils.GenerateId()
	scoreboard := make(map[string]int)
	deck := question.GetDefaultQuestions()
	return Game{Id: id, Users: nil, QuestionDeck: deck, Scoreboard: scoreboard}
}

func (g *Game) StartGame() error {
	// do initial testing
	if len(g.Users) <= 0 {
		return errors.New("No user exception, can't start game")
	}
	go g.runGame()
	return nil
}

func (g *Game) runGame() {
	fmt.Println("Running game:", g.Id)
	totalScore := 0
	g.Winner = g.Users[0].Username
	for {
		totalScore = totalScore + 1
		time.Sleep(time.Millisecond * 1600)
		if totalScore > 100 {
			g.EndGame()
			break
		}
	}
}

// EndGame updates players all time score at the end of the game
func (g *Game) EndGame() {
	for i := 0; i < len(g.Users); i++ {
		g.Users[i].Score += g.Scoreboard[g.Users[i].Username]
		if g.Users[i].Username == g.Winner {
			g.Users[i].WinCt += 1
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
