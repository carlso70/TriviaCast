package game

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/carlso70/triviacast/backend/question"
	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

type QuestionResponse struct {
	Username string `json:"username"`
	Answer   string `json:"answer"`
}

type Game struct {
	Id              int                 `json:"id"`
	Users           []user.User         `json:"users"`
	QuestionDeck    []question.Question `json:"-"`
	CurrentQuestion question.Question   `json:"question"`
	AskingQuestion  bool                `json:"askingQuestion"`
	Scoreboard      map[string]int      `json:"scoreboard"`
	QuestionCt      int                 `json:"questionCt"`
	GameDifficulty  int                 `json:"difficulty"`
	Winner          string              `json:"-"`
	responses       chan string         `json:"-"`
}

const (
	QUESTION_LENGTH = 30 * time.Second // In Seconds
)

func Init() Game {
	id := utils.GenerateId()
	scoreboard := make(map[string]int)
	responses := make(chan string)
	deck := question.GetDefaultQuestions()
	// Default QuestionCt = 10, GameDif = 1
	return Game{
		Id:             id,
		Users:          nil,
		QuestionDeck:   deck,
		Scoreboard:     scoreboard,
		responses:      responses,
		GameDifficulty: 1,
		QuestionCt:     10,
	}
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

// Runs a game instance, which contains the basic game logic
func (g *Game) runGame() {
	fmt.Println("Running game:", g.Id)
	totalScore := 0

	// Index to current question being display
	questionCt := 0

	// Send a snapshot message of the current game
	gameJson, _ := json.Marshal(g)
	SendMsg(string(gameJson))

	// Keep ask
	for totalScore < 100 || questionCt < len(g.QuestionDeck) {
		// Start a question, which delays for 30 seconds while listening for answers
		if err := g.startQuestion(g.QuestionDeck[questionCt]); err != nil {
			log.Panic(err)
		}
		questionCt += 1
	}

	g.EndGame()
}

// startQuestion starts a timer, and broadcasts the question while waiting for the game channel to fill or timer to expire
func (g *Game) startQuestion(q question.Question) error {
	g.CurrentQuestion = q
	g.AskingQuestion = true

	// Send a message of the current game
	gameJson, _ := json.Marshal(g)
	SendMsg(string(gameJson))

	// start timer, and tick chan

	fmt.Printf("Starting question %s...\n", q.Question)

	answers := make([]QuestionResponse, 0)

	timerChan := time.NewTimer(QUESTION_LENGTH).C
	done := make(chan bool)
	go func() {
		for g.AskingQuestion {
			select {
			case c := <-g.responses:
				var answer QuestionResponse
				fmt.Println("RECIEVED RESPONSE:", c)
				err := json.Unmarshal([]byte(c), answer)
				if err == nil {
					// if there is no err with the response add it to the current answer array
					answers = append(answers, answer)
					if len(answers) == len(g.Users) {
						g.AskingQuestion = false
					}
				}
			case <-timerChan:
				fmt.Println("TIMER EXPIRED")
				g.AskingQuestion = false
			default:
			}
		}
		done <- true
	}()

	// wait for goroutine to finish
	<-done

	fmt.Println("Finishing Question")
	// Check if the question responses match the answer
	for _, resp := range answers {
		if resp.Answer == g.CurrentQuestion.Answer {
			g.Scoreboard[resp.Username] += q.Value
		}
	}
	return nil
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

	// Send a message of the current game
	gameJson, _ := json.Marshal(g)
	SendMsg(string(gameJson))

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

// TODO Build a question deck based off of these settings
func (g *Game) CreateQuestionDeckFromSettings() {
	// g.QuestionDeck := make([qCount]question.Question)
	// for key, ques := range
}
