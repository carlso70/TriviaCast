package game

import (
	"fmt"
	"testing"

	"github.com/carlso70/triviacast/backend/user"
)

var testGameId = -99
var testUserId = -1

func TestAddUserToGame(t *testing.T) {
	game := Init()
	usr := user.Init()
	if err := game.AddUserToGame(usr); err != nil {
		for _, user := range game.Users {
			t.Log("User in game: ", user)
		}
		t.Error("Error add user to game:", err)
	}

	if len(game.Users) != 1 {
		t.Log("User in game:", game.Users)
		t.Error("Invalid user count")
	}
}

func TestAddMultipleUsersToGame(t *testing.T) {
	game := Init()
	for i := 0; i < 10; i++ {
		if err := game.AddUserToGame(user.User{Id: i}); err != nil {
			t.Error("Error add user to game:", err)
		}
	}
	if len(game.Users) != 10 {
		t.Log("Users: ", game.Users)
		t.Error("User count invalid")
	}
}

func TestRemoveUserFromGame(t *testing.T) {
	game := Init()
	usr := user.User{Id: testUserId}
	if err := game.AddUserToGame(usr); err != nil {
		t.Error("Error Adding User to Game:", err)
	}
	t.Log("User count before delete:", len(game.Users))
	if err := game.RemoveUserFromGame(usr); err != nil {
		t.Error("Error Removing User From Game", err)
	}
	t.Log("User count after delete:", len(game.Users))
	if len(game.Users) != 0 {
		t.Error("Invalid User Count after Delete", len(game.Users))
	}
}

func TestRunGame(t *testing.T) {
	game := Init()
	t.Log("Checking for no user exception on start game ....")
	err := game.StartGame()
	if err == nil {
		t.Error("Missed pre checks")
	}
	t.Log("Pass")
	t.Log("Adding user to game, and test startgame")
	usr := user.User{Id: testUserId}
	if err = game.AddUserToGame(usr); err != nil {
		t.Error(err)
	}
	err = game.StartGame()
	if err != nil {
		t.Error("Error starting game:", err)
	}
}
