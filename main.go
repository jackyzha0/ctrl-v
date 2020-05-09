package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")

}
