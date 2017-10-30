package repo

import (
	"testing"

	"github.com/carlso70/triviacast/backend/user"
)

var testId = -1

func TestAddUserToDB(t *testing.T) {
	// Create dummy user
	if err := AddUserToDB(user.User{Id: testId}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
}

func TestFindUser(t *testing.T) {
	// Create a test user with an Id only tests will have
	userTest := user.Init()
	userTest.Id = testId
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

func TestUpdateUser(t *testing.T) {
	t.Run("Add Test User", TestAddUserToDB)
	user, err := FindUser(testId)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	user.Username = "testing"
	err = UpdateUser(user)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	user2, err := FindUser(user.Id)
	if err != nil {
		t.Error("Error Recieved:", err)
	}
	if user2.Username != user.Username {
		t.Error("Update failed")
	}
}

func TestDeleteUser(t *testing.T) {
	t.Run("Add Test User", TestAddUserToDB)
	err := DeleteUser(testId)
	if err != nil {
		t.Errorf("Error Recieved: ", err)
	}
}
