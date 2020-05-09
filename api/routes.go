package api

import (
	"fmt"
	"net/http"
)

func healthCheckFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello there chief")
}
