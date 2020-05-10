package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/jackyzha0/ctrl-v/cache"
	"github.com/jackyzha0/ctrl-v/db"

	log "github.com/sirupsen/logrus"
)

func healthCheckFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "status ok")
}

func insertFunc(w http.ResponseWriter, r *http.Request) {

	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// get content
	_ = r.ParseMultipartForm(0)
	expiry := r.FormValue("expiry")
	content := r.FormValue("content")
	title := r.FormValue("title")

	// get ip
	ip := getIP(r)

	log.Infof("got content '%s' and ip '%s'", content, ip)

	// insert content
	err := db.New(ip, content, expiry, title)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "got err: %s", err.Error())
	}
}

func getHashFunc(w http.ResponseWriter, r *http.Request) {

	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	hash := mux.Vars(r)["hash"]
	paste, err := cache.C.Get(hash)

	// if hash was not found
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "got err: %s", err.Error())
		return
	}

	// otherwise, return paste content and current time
	w.Header().Set("Content-Type", "application/json")
	pasteMap := map[string]interface{}{
		"timestamp": time.Now(),
		"content":   paste.Content,
	}

	jsonData, _ := json.Marshal(pasteMap)
	fmt.Fprintf(w, "%+v", string(jsonData))
}
