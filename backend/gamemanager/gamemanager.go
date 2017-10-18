package gamemanager

import (
	"errors"
	"fmt"
	"sync"

	"github.com/carlso70/triviacast/backend/game"
	"github.com/carlso70/triviacast/backend/repo"
	"github.com/carlso70/triviacast/backend/user"
)

type Manager interface {
	CreateGame() (int, error)
	DeleteGame(gameId int) error
	AddUserToGame(gameId int, userId int) error
	GetUsers() ([]user.User, error)
}

type GameManager struct {
	Games []game.Game
}

var instance *GameManager
var once sync.Once

// GetInstance gets the current singleton instance if it exists, if not returns an empty instance
func GetInstance() *GameManager {
	once.Do(func() {
		games := make([]game.Game, 0)
		fmt.Println("Get Instance: once.DO")
		instance = &GameManager{Games: games}
	})
	return instance
}

// CreateGame adds a game to the GameServer
func (g *GameManager) CreateGame() (int, error) {
	// Create game instance
	newGame := game.Init()
	// Add game to list of games
	g.Games = append(g.Games, newGame)
	// Return the games Id, and error if it exists
	return newGame.Id, nil
}

func (g *GameManager) StartGame(id int) error {
	index, err := findGame(g.Games, id)
	if err != nil {
		return err
	}
	g.Games[index].StartGame()
	return nil
}

// GetUsers gets all the users in the DB and returns them
func (g *GameManager) GetUsers() ([]user.User, error) {
	userlist, err := repo.GetUsers()
	if err != nil {
		panic(err)
	}
	return userlist, err
}

func (g *GameManager) GetGames() []game.Game {
	return g.Games
}

// AddUserToGame searchs to see if game exists, then finds the user with the id
// and adds them to the game
func (g *GameManager) AddUserToGame(gameId, userId int) error {
	// Search for game instance
	index, err := findGame(g.Games, gameId)
	if err != nil {
		panic(err)
	}
	user, err := repo.FindUser(userId)
	if err != nil {
		panic(err)
	}
	fmt.Println("USER BEFORE: ", user)
	fmt.Println("GAMES USERS BEFORE:", g.Games[index].Users)
	g.Games[index].Users = append(g.Games[index].Users, user)

	// Join Game instance
	return nil
}

func (g *GameManager) DeleteGame(gameId int) error {
	// Search for game

	// Delete
	return nil
}

// findGame searchs existing games, and returns the index of to the game if it exists
func findGame(games []game.Game, gameId int) (int, error) {
	for i, game := range games {
		if game.Id == gameId {
			return i, nil
		}
	}

	return -1, errors.New("Game not found error")
}
