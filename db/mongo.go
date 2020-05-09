package db

import (
	"crypto/tls"
	"fmt"
	"net"

	"github.com/globalsign/mgo"
	log "github.com/sirupsen/logrus"
)

var Session *mgo.Session
var TextDB *mgo.Collection

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

	// Define connection to Databases
	TextDB = Session.DB("main").C("pastes")
}
