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
	password := r.FormValue("password")

	// get ip
	ip := getIP(r)

	log.Infof("got content '%s' and ip '%s'", content, ip)

	// insert content
	hash, err := db.New(ip, content, expiry, title, password)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "got err: %s", err.Error())
	}

	// if successful return paste hash
	w.Header().Set("Content-Type", "application/json")
	pasteMap := map[string]interface{}{
		"hash": hash,
	}

	jsonData, _ := json.Marshal(pasteMap)
	fmt.Fprintf(w, "%+v", string(jsonData))
}

func getHashFunc(w http.ResponseWriter, r *http.Request) {
	// no password given for get
	handleGetHash(w, r, "")
}

func getHashWithPasswordFunc(w http.ResponseWriter, r *http.Request) {
	// get password from form
	_ = r.ParseMultipartForm(0)
	gotPassword := r.FormValue("password")

	handleGetHash(w, r, gotPassword)

}

func handleGetHash(w http.ResponseWriter, r *http.Request, gotPassword string) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	hash := mux.Vars(r)["hash"]
	paste, err := cache.C.Get(hash, gotPassword)

	// if hash was not found
	if err == cache.PasteNotFound {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "got err: %s", err)
		return
	}

	// if paste is password protected
	if err == cache.UserUnauthorized {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "got err: %s", err)
		return
	}

	// otherwise, return paste content, title, and current time
	w.Header().Set("Content-Type", "application/json")
	pasteMap := map[string]interface{}{
		"timestamp": time.Now(),
		"title":     paste.Title,
		"content":   paste.Content,
		"expiry":    paste.Expiry,
	}

	jsonData, _ := json.Marshal(pasteMap)
	fmt.Fprintf(w, "%+v", string(jsonData))
}
