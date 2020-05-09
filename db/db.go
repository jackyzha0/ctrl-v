package db

import (
	"os"

	"github.com/jackyzha0/ctrl-v/hashing"
	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func init() {
	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file: %s", err.Error())
	}

	mUser := os.Getenv("MONGO_USER")
	mPass := os.Getenv("MONGO_PASS")
	mIP := os.Getenv("MONGO_SHARD_URL")

	initSessions(mUser, mPass, mIP)
}

// creates a new paste with content and hash
func New(ip, content string) error {
	// generate hash from ip
	hash := hashing.GenerateURI(ip)

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

// lookup
func Lookup(hash string) (Paste, error) {
	return fetch(hash)
}
