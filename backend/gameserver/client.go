package gameserver

import (
	"bufio"
)

// TCP client info
type Client struct {
	Reader *bufio.Reader
	Writer *bufio.Writer
}
