package db

import "github.com/globalsign/mgo/bson"

// Paste represents a single paste
type Paste struct {
	ID      bson.ObjectId `bson:"_id,omitempty"`
	Hash    string
	Content string
}

// add timestamp and expiry later
