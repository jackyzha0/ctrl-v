# ctrl-v source
### a modern, open-source pastebin with latex and markdown rendering support

Frontend is in React and backend is in Go.

![New Paste](https://user-images.githubusercontent.com/23178940/82101247-e4848a00-96c0-11ea-99c3-a2cd301c52bb.png)
![View Paste](https://user-images.githubusercontent.com/23178940/82101258-e9493e00-96c0-11ea-98ec-595f5f6f8b1d.png)
![View Paste (different theme)](https://user-images.githubusercontent.com/23178940/82101261-ea7a6b00-96c0-11ea-9cf1-9b81883ab9f5.png)

## developing
when doing local backend development, make sure you change the backend address to be localhost. You can find this on Line 4 of `frontend/src/helpers/httpHelper.js`

#### Common
`make dev` &mdash; starts React development server on `:3000` and backend on `:8080`

`make deploy` &mdash; deploys both frontend and backend

#### Frontend
`make fe-run` &mdash; starts React development server on `:3000`

`make fe-build` &mdash; builds development release of frontend in `frontend/build`

`make firebase` &mdash; deploys dev release of frontend to Firebase. Live at `ctrl-v.app`

#### Backend
`make run` &mdash; starts backend on `:8080`

`make lint` &mdash; lints all Go files 

`make docker-build` &mdash; builds Docker image of current backend

`make docker-run` &mdash; runs built Docker image on `:8080`

`make docker-all` &mdash; builds and runs built Docker image on `:8080`

`make docker-push` &mdash; pushes build Docker image to Dockerhub

`make gcr` &mdash; tags and pushes iamge to Google Container Registry for Cloud Run. Changes are live on `api.ctrl-v.app`