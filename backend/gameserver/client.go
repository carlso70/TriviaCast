package gameserver

import (
	"bufio"
	"net"
)

// TCP client info
type Client struct {
	Reader *bufio.Reader
	Writer *bufio.Writer
}
