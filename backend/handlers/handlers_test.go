package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func Test(t *testing.T) {
	var request GameSessionRequest
	request.Difficulty = 1
	request.QuestionCt = 10
	request.UserId = 499380
	jsonReq, _ := json.Marshal(request)

	reg, err := http.NewRequest("POST", "/creategame", bytes.NewBuffer(jsonReq))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	Router().ServerHTTP(response, request)

	assert.Equal(t, 200, response.Code, "OK response is expected")
}
