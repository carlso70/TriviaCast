package gameserver

// Singleton class

import (
	"sync"

	"github.com/carlso70/triviacast/backend/game"
	"github.com/carlso70/triviacast/backend/gamemanager"
)

const (
	CONN_HOST = "localhost"
	CONN_PORT = "3333"
	CONN_TYPE = "tcp"
)

// Singleton instance of game manager
var instance *gamemanager.GameManager
var once sync.Once

// GetInstance gets the current singleton instance if it exists, if not returns an empty instance
func GetInstance() *gamemanager.GameManager {
	once.Do(func() {
		games := make([]game.Game, 0)
		//initSocketServer()
		instance = &gamemanager.GameManager{Games: games}
	})
	return instance
}

/*
func initSocketServer() {
	ln, err := net.Listen(CONN_TYPE, CONN_HOST+":"+CONN_PORT)
	if err != nil {
		panic(err)
	}
	for {
		conn, err := ln.Accept()
		if err != nil {
			panic(err)
		}
		go handleConnection(conn)
	}
}
*/
