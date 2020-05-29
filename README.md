# ctrl-v source
### a modern, open-source pastebin with latex and markdown rendering support

Frontend is in React and backend is in Go.

![Go Paste Example](https://user-images.githubusercontent.com/23178940/83225601-06f0bb80-a135-11ea-9af2-9f2946459fe7.png)
![Markdown Rendering](https://user-images.githubusercontent.com/23178940/83225605-0821e880-a135-11ea-9efd-e7242ebde265.png)
![Showing off another theme!](https://user-images.githubusercontent.com/23178940/83225610-0a844280-a135-11ea-8c7c-4a0ecb13f379.png)
![Latex Rendering](https://user-images.githubusercontent.com/23178940/83225613-0c4e0600-a135-11ea-9f27-e5653cf9f343.png)

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