package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/jackyzha0/ctrl-v/security"

	"github.com/gorilla/mux"
	"github.com/jackyzha0/ctrl-v/cache"
	"github.com/jackyzha0/ctrl-v/db"
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
	lang := r.FormValue("language")

	// insert content
	hash, err := db.New(content, expiry, title, password, lang)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "%s", err.Error())
		return
	}

	// if successful return paste hash
	w.Header().Set("Content-Type", "application/json")
	pasteMap := map[string]interface{}{
		"hash": hash,
	}

	jsonData, _ := json.Marshal(pasteMap)
	fmt.Fprintf(w, "%+v", string(jsonData))
}

func getPasteFunc(w http.ResponseWriter, r *http.Request) {
	// no password given for get
	handleGetPaste(w, r, "")
}

func getPasteWithPasswordFunc(w http.ResponseWriter, r *http.Request) {
	// get password from form
	_ = r.ParseMultipartForm(0)
	parsedPassword := r.FormValue("password")

	handleGetPaste(w, r, parsedPassword)

}

func handleGetPaste(w http.ResponseWriter, r *http.Request, parsedPassword string) {
	// Allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	hash := mux.Vars(r)["hash"]
	paste, err := cache.C.Get(hash, parsedPassword)

	// if hash was not found
	if err == cache.PasteNotFound {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "%s", err)
		return
	}

	// if paste is password protected
	if err == cache.UserUnauthorized {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "%s", err)
		return
	}

	// if internal error with encryption
	if err == security.EncryptionError {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "%s", err)
		return
	}

	// otherwise, return paste content, title, and current time
	w.Header().Set("Content-Type", "application/json")
	pasteMap := map[string]interface{}{
		"timestamp": time.Now(),
		"title":     paste.Title,
		"content":   paste.Content,
		"expiry":    paste.Expiry,
		"language":  paste.Language,
	}

	jsonData, _ := json.Marshal(pasteMap)
	fmt.Fprintf(w, "%+v", string(jsonData))
}
