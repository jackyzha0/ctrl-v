package db

import (
	"os"

	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func init() {
	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")
	mIP := os.Getenv("MONGO_SHARD_URL")

	initSessions(mUser, mPass, mIP)
}

// creates a new
func New(hash, content string) error {

	// create new struct
	new := Paste{
		Hash:    hash,
		Content: content,
	}

	// insert struct
	log.Infof("create new paste with hash %s", hash)
	insertErr := insert(new)
	return insertErr
}
