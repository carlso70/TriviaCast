package question

// TODO remove the need for choicesString, currently in the DB choices is saved as one comma sperated string
type Question struct {
	Question      string `bson:"question"`
	Choices       []string
	choicesString string `bson:"choices"`
	Answer        string `bson:"answer"`
	Difficulty    string `bson:"difficulty"`
	Category      string `bson:"category"`
	Value         int    `bson:"value"`
}

func GetDefaultQuestions() []Question {
	deck := make([]Question, 1)
	ques1 := Question{
		Question:   "Do you like trivia",
		Choices:    []string{"Yes", "No", "I'm not sure"},
		Answer:     "Yes",
		Difficulty: "Easy",
		Category:   "Default",
		Value:      5,
	}
	ques2 := Question{
		Question:   "Do you like Purdue",
		Choices:    []string{"Yes", "No", "I'm not sure"},
		Answer:     "Yes",
		Difficulty: "Easy",
		Category:   "Default",
		Value:      5,
	}
	deck = append(deck, ques1, ques2)
	return deck
}
