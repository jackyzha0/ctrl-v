package db

import (
	"context"
	"crypto/tls"
	"fmt"
	"time"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var Client *mongo.Client
var Session *mongo.Session
var pastes *mongo.Collection

func initSessions(user, pass, ip string) {
	log.Infof("attempting connection to %s", ip)

	// build uri string
	URIfmt := "mongodb://%s:%s@%s:27017"
	mongoURI := fmt.Sprintf(URIfmt, user, pass, ip)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
  c, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI).SetTLSConfig(&tls.Config{}))
  Client = c
	if err != nil {
		log.Fatalf("error establishing connection to mongo: %s", err.Error())
	}
	err = Client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatalf("error pinging mongo: %s", err.Error())
	}

	// ensure expiry check
	expiryIndex := options.Index().SetExpireAfterSeconds(0)
	sessionTTL := mongo.IndexModel{
		Keys:    []string{"expiry"},
		Options: expiryIndex,
	}

	// ensure hashes are unique
	uniqueIndex := options.Index().SetUnique(true)
	uniqueHashes := mongo.IndexModel{
		Keys:    []string{"hash"},
		Options: uniqueIndex,
	}

	// Define connection to Databases
	pastes = Client.Database("main").Collection("pastes")
	_, _ = pastes.Indexes().CreateOne(ctx, sessionTTL)
	_, _ = pastes.Indexes().CreateOne(ctx, uniqueHashes)
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
	err := pastes.FindOne(ctx, q).Decode(&p)
	return p, err
}
