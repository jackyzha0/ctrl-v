package db

import (
	"crypto/tls"
	"fmt"
	"net"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	log "github.com/sirupsen/logrus"
)

var Session *mgo.Session
var pastes *mgo.Collection

func initSessions(user, pass, ip string) {
	log.Infof("attempting connection to %s", ip)

	// build uri string
	URIfmt := "mongodb://%s:%s@%s:27017"
	mongoURI := fmt.Sprintf(URIfmt, user, pass, ip)
	dialInfo, err := mgo.ParseURL(mongoURI)
	if err != nil {
		log.Fatalf("error parsing uri: %s", err.Error())
	}

	tlsConfig := &tls.Config{}
	dialInfo.DialServer = func(addr *mgo.ServerAddr) (net.Conn, error) {
		conn, err := tls.Dial("tcp", addr.String(), tlsConfig)
		return conn, err
	}

	Session, err = mgo.DialWithInfo(dialInfo)
	if err != nil {
		log.Fatalf("error establishing connection to mongo: %s", err.Error())
	}

	// ensure expiry check
	sessionTTL := mgo.Index{
		Key:         []string{"expiry"},
		ExpireAfter: 0,
	}

	// ensure hashes are unique
	uniqueHashes := mgo.Index{
		Key:    []string{"hash"},
		Unique: true,
	}

	_ = Session.DB("main").C("pastes").EnsureIndex(sessionTTL)
	_ = Session.DB("main").C("pastes").EnsureIndex(uniqueHashes)

	// Define connection to Databases
	pastes = Session.DB("main").C("pastes")
}

func insert(new Paste) error {
	return pastes.Insert(new)
}

func fetch(hash string) (Paste, error) {
	p := Paste{}

	q := bson.M{"hash": hash}
	err := pastes.Find(q).One(&p)
	return p, err
}
