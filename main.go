package main

import (
	"github.com/jackyzha0/ctrl-v/api"
	_ "github.com/jackyzha0/ctrl-v/cache" // setup cache
	_ "github.com/jackyzha0/ctrl-v/db"    // setup db
)

func main() {
	api.Serve(8080)
}
