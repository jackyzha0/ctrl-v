package api

import (
	"fmt"
	"net/http"

	"github.com/jackyzha0/ctrl-v/db"

	log "github.com/sirupsen/logrus"
)

func healthCheckFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "status ok")
}

func insertFunc(w http.ResponseWriter, r *http.Request) {
	// get content
	_ = r.ParseMultipartForm(0)
	content := r.FormValue("content")

	// get ip
	ip, _ := getIP(r)

	log.Infof("got content '%s' and ip '%s'", content, ip)

	// insert content
	err := db.New(ip, content)
	if err != nil {
		fmt.Fprintf(w, "got err: %s", err.Error())
	}
}
