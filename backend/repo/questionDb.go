package repo

import (
	"github.com/carlso70/triviacast/backend/user"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const (
	Username   = "YOUR_USERNAME"
	Password   = "YOUR_PASS"
	Database   = "trivia"
	Collection = "questions"
)

func GetQuestionDeck(difficulty int) {
	var difString string
	if difficulty == 1 {
		difString = "Easy"
	} else if difficulty == 2 {
		difString = "Medium"
	} else {
		difString = "Hard"
	}
}
