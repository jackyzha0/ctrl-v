# ctrl-v source
### a modern, open-source pastebin with latex and markdown rendering support

Frontend is in React and backend is in Go.

## developing
#### Common
`make all` &mdash; starts React development server on `:3000` and backend on `:8080`

#### Frontend
`make fe-run` &mdash; starts React development server on `:3000`
`make fe-build` &mdash; builds development release of frontend in `frontend/build`

#### Backend
`make run` &mdash; starts backend on `:8080`
`make lint` &mdash; lints all Go files 
`make docker-build` &mdash; builds Docker image of current backend
`make docker-run` &mdash; runs built Docker image on `:8080`
`make docker-all` &mdash; builds and runs built Docker image on `:8080`
`make docker-push` &mdash; pushes build Docker image to Dockerhub