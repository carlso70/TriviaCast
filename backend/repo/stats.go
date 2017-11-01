package repo

import (
	"fmt"
	"github.com/carlso70/triviacast/backend/user"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Returns an array of users sorted by highest score
func QueryHighScores() []user.User {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(Collection)
	result := []user.User{}
	// Refer to the bson encodings in the user package for other properties
	//err = c.Find(bson.M{}).All(&result).Sort(bson.D{{"score", 1}}).Iter()
	err = c.Find(bson.M{}).All(&result)
	if err != nil {
		fmt.Println("Error:", err)
		return []user.User{}
	}
	// Sort the array of users by score
	// TODO figure out mgo query to avoid doing an insertion sort, because this is WRONG
	for i := 0; i < len(result)-1; i++ {
		for j := i + 1; j < len(result); j++ {
			if result[i].Score < result[j].Score {
				temp := result[i]
				result[i] = result[j]
				result[j] = temp
			}
		}
	}

	return result
}
