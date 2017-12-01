package question

import (
	"testing"
)

func TestGetDefaultQuestions(t *testing.T) {
	testDeck := GetDefaultQuestions()
	err := testDeck[0].Question
	if err != "Do you like trivia" {
		t.Errorf("Error received: ", err)
	}
	err = testDeck[1].Question
	if err != "Do you like Purdue" {
		t.Errorf("Error received: ", err)
	}
	err = testDeck[0].Answer
	if err != "Yes" {
		t.Errorf("Error received: ", err)
	}
	err = testDeck[1].Answer
	if err != "Yes" {
		t.Errorf("Error received: ", err)
	}

}

func TestConvertDifficultyToValue(t *testing.T) {
	err := ConvertDifficultyToValue("Easy")
	if err != 1 {
		t.Errorf("Error received: ", err)
	}
	err = ConvertDifficultyToValue("Medium")
	if err != 2 {
		t.Errorf("Error received: ", err)
	}
	err = ConvertDifficultyToValue("Hard")
	if err != 3 {
		t.Errorf("Error received: ", err)
	}
	err = ConvertDifficultyToValue("Hello")
	if err != 1 {
		t.Errorf("Error received: ", err)
	}
}

func TestConvertDifficulty(t *testing.T) {
	err := ConvertDifficulty(0)
	if err != "Easy" {
		t.Errorf("Error received: ", err)
	}
	err = ConvertDifficulty(1)
	if err != "Medium" {
		t.Errorf("Error received: ", err)
	}
	err = ConvertDifficulty(2)
	if err != "Hard" {
		t.Errorf("Error received: ", err)
	}
}
