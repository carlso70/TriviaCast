package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/carlso70/triviacast/backend/gamemanager"
	"github.com/carlso70/triviacast/backend/repo"
	"github.com/carlso70/triviacast/backend/user"
	"github.com/carlso70/triviacast/backend/utils"
)

type AccountRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type AvatarRequest struct {
	Username int `json:"userId"`
}

type PasswordChangeRequest struct {
	Username    string `json:"username"`
	OldPassword string `json:"oldPassword"`
	NewPassword string `json:"newPassword"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var request AccountRequest

	fmt.Println("CREATE USER")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("username: ", request.Username)

	// password encrypting check user is valid
	if request.Username == "" || request.Password == "" {
		http.Error(w, "Invalid Username or Password", 500)
		return
	}

	// Check if user already exists
	if usr, _ := repo.FindUserByUsername(request.Username); usr.Username != "" {
		http.Error(w, "User already exists", 500)
		return
	}
	usr := user.Init()
	usr.Username = request.Username
	usr.Password = utils.EncryptPass(request.Password)

	if err := repo.AddUserToDB(usr); err != nil {
		panic(err)
	}

	byteSlice, err := json.Marshal(&usr)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

// LoginUser checks the attemped username and password to see if it is a valid request
func LoginUser(w http.ResponseWriter, r *http.Request) {
	var request AccountRequest

	fmt.Println("LOGIN USER")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		http.Error(w, "Server Problem", 500)
	}
	defer r.Body.Close()
	fmt.Println("username: ", request.Username)

	if request.Username == "" || request.Password == "" {
		http.Error(w, "Invalid Password", 500)
		return
	}

	usr, err := repo.FindUserByUsername(request.Username)
	if err = utils.DecryptPass(request.Password, usr.Password); err != nil {
		// send error response if login failed
		//TODO send correct error code
		http.Error(w, "Invalid Password", 500)
		return
	}
	byteSlice, err := json.Marshal(&usr)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

func ChangePassword(w http.ResponseWriter, r *http.Request) {
	var request PasswordChangeRequest

	fmt.Println("CHANGING PASSWORD")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		http.Error(w, "Server Problem", 500)
	}
	defer r.Body.Close()
	fmt.Println("username: ", request.Username)

	if request.Username == "" || request.OldPassword == "" || request.NewPassword == "" {
		fmt.Println("Empty password change request")
		http.Error(w, "Invalid Password", 500)
		return
	}

	usr, err := repo.FindUserByUsername(request.Username)
	if err = utils.DecryptPass(request.OldPassword, usr.Password); err != nil {
		// send error response if login failed
		fmt.Println("Old Password does not match")
		http.Error(w, "Invalid Password", 500)
		return
	}
	// Encrypt New Password
	usr.Password = utils.EncryptPass(request.NewPassword)
	// Update user password
	err = repo.UpdateUserPassword(usr)
	if err != nil {
		fmt.Println("ERROR CHANGING PASSWORD:", err)
		return
	}
	fmt.Fprintf(w, "{ \"message\": \"success\" }\n")
}

// RequestUsers gets a list of all the users
func ListUsers(w http.ResponseWriter, r *http.Request) {
	// Get the gamemanager instance, get all users
	gamemanager := gamemanager.GetInstance()
	users, err := gamemanager.GetUsers()
	if err != nil {
		log.Panic(err)
	}

	for _, user := range users {
		byteSlice, err := json.Marshal(&user)
		if err != nil {
			log.Panic(err)
		}

		fmt.Println("USER string = ", string(byteSlice))
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
	if len(users) == 0 {
		http.Error(w, "No Users Found", 500)
	}
}

func GetHighScores(w http.ResponseWriter, r *http.Request) {
	users := repo.QueryHighScores()
	byteSlice, err := json.Marshal(&users)
	if err != nil {
		log.Panic(err)
	}
	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

func UploadAvatar(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var Buf bytes.Buffer
	// Set users avatarUrl
	strid := r.FormValue("userId")
	if strid == "" {
		fmt.Println("missing userid")
		http.Error(w, "Invalid userId", 500)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	name := header.Filename
	fmt.Printf("File name %s\n", name)

	// Write the file
	io.Copy(&Buf, file)
	err = ioutil.WriteFile(name, Buf.Bytes(), 0666)

	// Upload file
	location := utils.UploadFileToS3(name)

	userid, err := strconv.Atoi(strid)
	if err != nil {
		panic(err)
		http.Error(w, "Invalid userId", 500)
		return
	}

	// Update the user's new file location
	usr, err := repo.FindUser(userid)
	if err != nil {
		panic(err)
		http.Error(w, "Invalid userId", 500)
		return
	}
	usr.AvatarLink = location
	err = repo.UpdateUser(usr)
	if err != nil {
		panic(err)
	}

	// Delete the file since it has been uploaded
	err = os.Remove(name)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "{ \"avatarUrl\": \"%s\" }\n", location)
}
