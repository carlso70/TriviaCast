package game

import (
	"errors"
	"fmt"
	"time"

	"github.com/carlso70/triviacast/backend/gameserver"
	"github.com/carlso70/triviacast/backend/question"
	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

type Game struct {
	Id              int                 `json:"id"`
	Users           []user.User         `json:"users"`
	QuestionDeck    []question.Question `json:"deck"`
	CurrentQuestion question.Question   `json:"question"`
	Scoreboard      map[string]int      `json:"scoreboard"`
	Winner          string
}

const (
	QUESTION_LENGTH = 30 * time.Second // In Seconds
)

func Init() Game {
	id := utils.GenerateId()
	scoreboard := make(map[string]int)
	deck := question.GetDefaultQuestions()
	return Game{Id: id, Users: nil, QuestionDeck: deck, Scoreboard: scoreboard}
}

func (g *Game) StartGame() error {
	fmt.Println("USERS ")
	fmt.Println(g.Users)
	// do initial testing
	if len(g.Users) <= 0 {
		fmt.Println("0 USERS IN GAME ", g.Id)
		return errors.New("No user exception, can't start game")
	}
	go g.runGame()
	return nil
}

// TODO runGame
func (g *Game) runGame() {
	fmt.Println("Running game:", g.Id)
	totalScore := 0
	g.Winner = g.Users[0].Username
	// Index to current question being display
	questionCt := 0
	gameserver.Broadcast()
	for {
		totalScore = totalScore + 1
		time.Sleep(time.Millisecond * 900)

		// Start a question, which delays for 30 seconds while listening for answers
		if err := g.startQuestion(g.QuestionDeck[questionCt]); err != nil {
			panic(err)
		}
		questionCt += 1

		// Criteria to end game
		if totalScore > 100 || questionCt > len(g.QuestionDeck)-1 {
			g.EndGame()
			break
		}
	}
}

// startQuestion TODO starts a timer, and broadcasts the question while listening for responses
func (g *Game) startQuestion(q question.Question) error {
	g.CurrentQuestion = q
	// broadcast to tcp server current question
	gameserver.Broadcast()
	// start timer
	timerChan := time.NewTimer(QUESTION_LENGTH).C
	fmt.Printf("Starting question %s...\n", q.Question)
	for {
		// TODO implement question logic

		// TODO  other channels not just timer
		select {
		case <-timerChan:
			fmt.Println("Timer Expired")
			return nil
		}
		return nil
	}
}

// EndGame updates players all time score at the end of the game
func (g *Game) EndGame() {
	// TODO broadcast to in game users that the game is over
	fmt.Println("Ending game....")

	for i := 0; i < len(g.Users); i++ {
		g.Users[i].Score += g.Scoreboard[g.Users[i].Username]
		if g.Users[i].Username == g.Winner {
			g.Users[i].WinCt += 1
		}
	}
	// TODO update user in DB

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
