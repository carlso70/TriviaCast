package gameserver

// Singleton class

import (
	"sync"

	"github.com/carlso70/triviacast/game"
	"github.com/carlso70/triviacast/user"
)

type GameServer interface {
	CreateGame(createrId int) (int, error)
	DeleteGame(gameId int) error
	AddUserToGame(gameId int, userId int) error
	GetUsers() ([]user.User, error)
}

const (
	Port = ":8081"
)

// Singleton instance of game manager
var instance *GameManager
var once sync.Once

// GetInstance gets the current singleton instance if it exists, if not returns an empty instance
func GetInstance() *GameManager {
	once.Do(func() {
		games := make([]*game.Game, 0)
		//initSocketServer()
		instance = &GameManager{Games: games}
	})
	return instance
}

/*
func initSocketServer() {
	ln, err := net.Listen("tcp", ":8081")
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
