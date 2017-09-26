package routing

import (
	"net/http"

	"github.com/carlso70/triviacast/backend/handlers"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		handlers.Index,
	},
	Route{
		"StartGame",
		"POST",
		"/startgame",
		handlers.StartGame,
	},
	Route{
		"ListUsers",
		"GET",
		"/listusers",
		handlers.ListUsers,
	},
	Route{
		"ListGames",
		"GET",
		"/listgames",
		handlers.ListGames,
	},
}
