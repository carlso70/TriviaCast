package gamemanager

import (
	"errors"
	"fmt"

	"github.com/carlso70/triviacast/game"
	"github.com/carlso70/triviacast/repo"
	"github.com/carlso70/triviacast/user"
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

// CreateGame adds a game to the GameServer
func (g *GameManager) CreateGame() (int, error) {
	// Create game instance
	newGame := game.Init()

	// Add game to list of games
	g.Games = append(g.Games, newGame)

	fmt.Println(g.Games)
	// Return the games Id, and error if it exists
	return newGame.Id, nil
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
	game, err := findGame(g.Games, gameId)
	if err != nil {
		panic(err)
	}
	user, err := repo.FindUser(userId)
	if err != nil {
		panic(err)
	}
	game.Users = append(game.Users, user)
	// Join Game instance
	return nil
}

func (g *GameManager) DeleteGame(gameId int) error {
	// Search for game

	// Delete
	return nil
}

// findGame searchs existing games, and returns a pointer to the game if it exists
func findGame(games []game.Game, gameId int) (game.Game, error) {
	for _, game := range games {
		if game.Id == gameId {
			return game, nil
		}
	}

	return game.Game{}, errors.New("Game not found error")
}
