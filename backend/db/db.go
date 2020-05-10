package db

import (
	"fmt"
	"os"
	"time"

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

// creates a new paste with title, content and hash
func New(ip, content, expiry, title string) error {
	// generate hash from ip
	hash := hashing.GenerateURI(ip)

	// create new struct
	new := Paste{
		Hash:    hash,
		Content: content,
		Title:   title,
	}

	// check if expiry
	if expiry != "" {
		t, err := time.Parse(time.RFC3339, expiry)

		// if time format not current
		if err != nil {
			return err
		}

		// time is in the past
		if t.After(time.Now()) {
			return fmt.Errorf("err: time %s is in the past", t.String())
		}

		new.Expiry = t

	} else {
		// 5 year expiry
		new.Expiry = time.Now().Add(time.Hour * 43800)
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
