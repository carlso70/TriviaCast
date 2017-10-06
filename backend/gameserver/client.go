package gameserver

import (
	"github.com/carlso70/triviacast/backend/user"
	"net"
)

// TCP client info contians a connection and pointer to a user
type Client struct {
	Connection net.Conn
	User       user.User
}
