package repo

import (
	"github.com/carlso70/triviacast/backend/user"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
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
		return user.User{}, err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)
	result := user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{"id": userId}).One(&result)
	return result, err
}

func FindUser(username string) (user.User, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return user.User{}, err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)
	result := user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{"username": username}).One(&result)
	return result, err
}

func GetUsers() ([]user.User, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(Collection)
	result := []user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{}).All(&result)
	return result, err
}

// TODO test update user
func UpdateUser(user.User) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(Collection)
	result := []user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Update(bson.Marshal(user))
	return result, err

}

func DeleteUser(userId int) error {
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
		return err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)
	// Refer to the bson encodings in the user package for other properties
	err = c.Remove(bson.M{"id": userId})
	return err
}
