package repo

import (
	"testing"

	"github.com/carlso70/triviacast/backend/user"
)

var testId = -1

func TestAddHighScores(t *testing.T) {
	if err := AddUserToDB(user.User{Id: 30, Username:"Hot Tuna", Score: 210}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
	if err := AddUserToDB(user.User{Id: 25, Username:"Bob", Score: 200}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
	if err := AddUserToDB(user.User{Id: 69, Username:"Shoe", Score: 190}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
	if err := AddUserToDB(user.User{Id: 11, Username:"suh", Score: 180}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
	if err := AddUserToDB(user.User{Id: 12, Username:"Love Skl69", Score: 10}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
	if err := AddUserToDB(user.User{Id: 44, Username:"YoloSwag", Score: 130}); err != nil {
		t.Error("Error AddUserToDB: ", err)
	}
}

func TestAddUserToDB(t *testing.T) {
	// Create dummy user
	if err := AddUserToDB(user.User{Id: testId, Username:"Cold Tuna", Score: 150}); err != nil {
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

func TestUpdateUserPassword(t *testing.T) {
	user := user.Init()
	user.Id = 15
	user.Password = "OldPassword"
	err := AddUserToDB(user)
	if err != nil {
		t.Errorf("Error in AddUserToDB: %s", err)
	}
	testUsr, err := FindUser(user.Id)
	if testUsr.Password != user.Password {
		t.Errorf("Error finding user, not matching passwords")
	}
	user.Password = "NewPassword"
	UpdateUserPassword(user)
	testUsr, err = FindUser(user.Id)
	if testUsr.Password != user.Password {
		t.Errorf("Error not matching passwords after update on find")
	}
}

/*
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
*/
func TestDeleteUser(t *testing.T) {
	t.Run("Add Test User", TestAddUserToDB)
	err := DeleteUser(testId)
	if err != nil {
		t.Errorf("Error Recieved: ", err)
	}
}
