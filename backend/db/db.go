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

const TitleLimit = 100
const ContentLimit = 100000

// creates a new paste with title, content and hash, returns the hash of the created paste
func New(ip, content, expiry, title, password string) (string, error) {
	// generate hash from ip
	hash := hashing.GenerateURI(ip)

	// check for size of title and content
	errs := checkLengths(title, content)
	if errs != nil {
		return "", errs
	}

	// create new struct
	new := Paste{
		Hash:    hash,
		Content: content,
		Title:   title,
	}

	if password != "" {
		// hash given password
		hashedPass, err := hashing.HashPassword(password)
		if err != nil {
			return "", fmt.Errorf("could not hash password: %s", err.Error())
		}
		new.Password = hashedPass
	}

	// check if expiry
	if expiry != "" {
		t, err := time.Parse(time.RFC3339, expiry)

		// if time format not current
		if err != nil {
			return "", err
		}

		// time is in the past
		if time.Now().After(t) {
			return "", fmt.Errorf("time %s is in the past", t.String())
		}

		new.Expiry = t

	} else {
		// 5 year expiry
		new.Expiry = time.Now().Add(time.Hour * 43800)
	}

	// insert struct
	log.Infof("create new paste with hash %s", hash)
	insertErr := insert(new)
	return hash, insertErr
}

func checkLengths(title string, content string) error {
	errs := ""
	if len(title) > TitleLimit {
		errs += fmt.Sprintf("title is longer than character limit of %d\n", TitleLimit)
	}
	if len(content) > ContentLimit {
		errs += fmt.Sprintf("content is longer than character limit of %d\n", ContentLimit)
	}
	// if any errors were found
	if errs != "" {
		return fmt.Errorf(errs)
	}

	return nil
}

// lookup
func Lookup(hash string) (Paste, error) {
	return fetch(hash)
}
