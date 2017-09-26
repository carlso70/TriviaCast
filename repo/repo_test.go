package repo

import (
	"github.com/carlso70/triviacast/user"
	"testing"
)

func TestAddUserToDB(t *testing.T) {
	// create dummy user
	userTest := user.Init()
	userTest.Id = -1
	if err := AddUserToDB(userTest); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
}

func TestFindUser(t *testing.T) {
	// Create a test user with an Id only tests will have
	userTest := user.Init()
	userTest.Id = -1
	err := AddUserToDB(userTest)
	if err != nil {
		t.Errorf("Error in AddUserToDB: %s", err)
	}
	user, err := FindUser(userTest.Id)
	if user.Id != userTest.Id {
		t.Log("Want user with Id:", userTest.Id, "got:", user.Id)
		t.Error("Error Recieved: ", err)
	}
}

func TestGetAllUser(t *testing.T) {
	users, err := GetUsers()
	t.Log("Users count:", len(users))
	if err != nil && len(users) > 0 {
		t.Errorf("Error Recieved:", err)
	}
}
