package repo

import (
	"errors"
	//	"time"

	"github.com/carlso70/triviacast/user"
	"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"
)

var Users []user.User

var Host = []string{
	"127.0.0.1:27017",
	// replica set addrs...
}

const (
	Username   = "YOUR_USERNAME"
	Password   = "YOUR_PASS"
	Database   = "trivia"
	Collection = "users"
)

func CreateDummyUsers() {
	for i := 0; i < 15; i++ {
		user := user.Init()
		user.Id = i
		AddUserToDB(user)
	}
}

func AddUserToDB(user user.User) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
		// Username: Username,
		// Password: Password,
		// Database: Database,
		// DialServer: func(addr *mgo.ServerAddr) (net.Conn, error) {
		// 	return tls.Dial("tcp", addr.String(), &tls.Config{})
		// },
	})
	if err != nil {
		panic(err)
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)

	// Insert, and return err
	err = c.Insert(user)
	return err
}

func FindUser(userId int) (user.User, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
		// Username: Username,
		// Password: Password,
		// Database: Database,
		// DialServer: func(addr *mgo.ServerAddr) (net.Conn, error) {
		// 	return tls.Dial("tcp", addr.String(), &tls.Config{})
		// },
	})
	if err != nil {
		panic(err)
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)

	return user.User{}, errors.New("User not found error")
}

func GetUsers() ([]user.User, error) {
	return Users, nil
}
