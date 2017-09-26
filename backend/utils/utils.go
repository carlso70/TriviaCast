package utils

import (
	"math/rand"
	"time"
)

func GenerateId() int {
	max := 1000000
	min := 1
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}
