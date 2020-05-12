package api

import (
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	mux "github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

func cleanup() {
	log.Print("Shutting down server...")
}

// Define router and start server
func Serve(port int) {
	// Sigint trapper
	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		cleanup()
		os.Exit(0)
	}()

	// Define Mux Router
	r := mux.NewRouter()
	r.HandleFunc("/health", healthCheckFunc)
	r.HandleFunc("/api", insertFunc).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/{hash}", getPasteFunc).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/{hash}", getPasteWithPasswordFunc).Methods("POST", "OPTIONS")

	http.Handle("/", r)

	// Start HTTP server
	server := newServer(":"+strconv.Itoa(port), r)
	log.Printf("Starting server on %d", port)

	defer cleanup()
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

// Function to create new HTTP server
func newServer(addr string, router http.Handler) *http.Server {
	return &http.Server{
		Addr:         addr,
		Handler:      router,
		ReadTimeout:  time.Second * 30,
		WriteTimeout: time.Second * 30,
	}
}
