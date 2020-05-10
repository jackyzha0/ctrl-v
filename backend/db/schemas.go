package db

import (
	"time"

	"github.com/globalsign/mgo/bson"
)

// Paste represents a single paste
type Paste struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Hash     string
	Content  string
	Expiry   time.Time `bson:"expiry"`
	Title    string
	Password string
}
