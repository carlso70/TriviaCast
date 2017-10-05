package utils

import (
	"math/rand"
)

func GenerateId() int {
	max := 1000000
	min := 1
	return rand.Intn(max-min) + min
}
