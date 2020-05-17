package db

import (
	"time"

	"github.com/globalsign/mgo/bson"
)

// Paste represents a single paste
type Paste struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Hash     string
	Title    string
	Content  string
	Language string
	Password string
	Expiry   time.Time `bson:"expiry"`
	Salt     []byte
}
