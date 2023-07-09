package db

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Paste represents a single paste
type Paste struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Hash     string
	Title    string
	Content  string
	Language string
	Password string
	Expiry   time.Time `bson:"expiry"`
	Salt     []byte
}
