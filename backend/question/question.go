package question

// TODO remove the need for choicesString, currently in the DB choices is saved as one comma sperated string
type Question struct {
	Question      string   `json:"question" bson:"question"`
	Choices       []string `json:"-"`
	choicesString string   `json:"-" bson:"choices"`
	Answer        string   `json:"-" bson:"answer"`
	Difficulty    string   `json:"difficulty" bson:"difficulty"`
	Category      string   `json:"category" bson:"category"`
	Value         int      `json:"value" bson:"value"`
}

func GetDefaultQuestions() []Question {
	deck := make([]Question, 0)
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
