package db

import (
	"context"
	"fmt"
	"time"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Session *mongo.Session
var pastes *mongo.Collection

func initSessions(user, pass, ip string) {
	log.Infof("attempting connection to %s", ip)

	// build uri string
	URIfmt := "mongodb://%s:%s@%s:27017"
	mongoURI := fmt.Sprintf(URIfmt, user, pass, ip)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("error establishing connection to mongo: %s", err.Error())
	}

	// ensure expiry check
  expiryIndex := options.Index().SetExpireAfterSeconds(0)
	sessionTTL := mongo.IndexModel{
		Keys: []string{"expiry"},
    Options: expiryIndex,
	}

	// ensure hashes are unique
  uniqueIndex := options.Index().SetUnique(true)
	uniqueHashes := mongo.IndexModel{
		Keys:    []string{"hash"},
    Options: uniqueIndex,
	}

	_, _ = client.Database("main").Collection("pastes").Indexes().CreateOne(ctx, sessionTTL)
	_, _ = client.Database("main").Collection("pastes").Indexes().CreateOne(ctx, uniqueHashes)

	// Define connection to Databases
	pastes = client.Database("main").Collection("pastes")
}

func insert(new Paste) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
  _, err := pastes.InsertOne(ctx, new)
  return err
}

func fetch(hash string) (Paste, error) {
	p := Paste{}
	q := bson.M{"hash": hash}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	result := pastes.FindOne(ctx, q)
	if (result.Err() != nil) {
	  return p, result.Err()
	} else {
	  result.Decode(&p)
	  return p, nil
	}
}
