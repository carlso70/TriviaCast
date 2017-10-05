package gameserver

// Singleton class

import (
	"fmt"
	"sync"

	"github.com/carlso70/triviacast/backend/game"
	"github.com/carlso70/triviacast/backend/gamemanager"
)

// Singleton instance of game manager
var instance *gamemanager.GameManager
var once sync.Once

// GetInstance gets the current singleton instance if it exists, if not returns an empty instance
func GetInstance() *gamemanager.GameManager {
	once.Do(func() {
		games := make([]game.Game, 0)
		fmt.Println("Get Instance: once.DO")
		instance = &gamemanager.GameManager{Games: games}
	})
	return instance
}
