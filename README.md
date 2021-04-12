# ctrl-v
### A modern, open-source pastebin with latex and markdown rendering support
Frontend is in React + Next.js and backend is in Go. Deployed via Vercel and Google Cloud Run.

![Go Paste Example](https://user-images.githubusercontent.com/23178940/83225601-06f0bb80-a135-11ea-9af2-9f2946459fe7.png)
![Markdown Rendering](https://user-images.githubusercontent.com/23178940/83225605-0821e880-a135-11ea-9efd-e7242ebde265.png)
![Showing off another theme!](https://user-images.githubusercontent.com/23178940/83225610-0a844280-a135-11ea-8c7c-4a0ecb13f379.png)
![Latex Rendering](https://user-images.githubusercontent.com/23178940/83225613-0c4e0600-a135-11ea-9f27-e5653cf9f343.png)

## Public API
The ctrl-v API is provided for free for other developers to easily develop on top of it. It can be reached at `https://api.ctrl-v.app/`.

### `GET /health`
```bash
# get the health of the API
curl https://api.ctrl-v.app/health

# 200 OK
# > "status ok"
```

### `POST /api`
```bash
# create a new paste
curl -L -X POST 'https://api.ctrl-v.app/api' \
    -F 'expiry=2021-03-09T01:02:43.082Z' \
    -F 'content=print(\"test content\")' \
    -F 'title=test paste' \
    -F 'language=python'

# or with a password
curl -L -X POST 'https://api.ctrl-v.app/api' \
    -F 'expiry=2021-03-09T01:02:43.082Z' \
    -F 'content=print(\"test content\")' \
    -F 'title=test paste' \
    -F 'language=python' \
    -F 'password=hunter2'

# 200 OK
# > { "hash": "6Z7NVVv" }

# 400 BAD_REQUEST
# happens when title/body is too long, password couldnt
# be hashed, or expiry is not in RFC3339 format
```
### `GET /api/{hash}`
```bash
# get unprotected hash
curl https://api.ctrl-v.app/api/1t9UybX

# 200 OK
# > {
# >   "content": "print(\"test content\")",
# >   "expiry": "2021-03-09T01:02:43.082Z",
# >   "language": "python",
# >   "timestamp": "2021-03-02T01:06:16.209501971Z",
# >   "title": "test paste"
# > }

# 401 BAD_REQUEST
# happens when paste is password protected. when this happens, try the authenticated alternative using POST
# 404 NOT_FOUND
# no paste with that ID found
```

### `POST /api/{hash}`
```bash
# get unprotected hash
curl -L -X POST 'https://api.ctrl-v.app/api/1t9UybX' \
  -F 'password=hunter2'

# 200 OK
# > {
# >   "content": "print(\"test content\")",
# >   "expiry": "2021-03-09T01:02:43.082Z",
# >   "language": "python",
# >   "timestamp": "2021-03-02T01:06:16.209501971Z",
# >   "title": "test paste"
# > }

# 401 BAD_REQUEST
# wrong password
# 404 NOT_FOUND
# no paste with that ID found
```

## Developing
when doing local backend development, make sure you change the backend address to be localhost. You can find this on Line 4 of `frontend/src/http/shared.js`

### Common
`make dev` &mdash; starts React development server on `:3000` and backend on `:8080`

### Frontend
`make fe-run` &mdash; starts React development server on `:3000`

`make fe-build` &mdash; builds development release of frontend in `frontend/build`

### Backend
`make run` &mdash; starts backend on `:8080`

`make lint` &mdash; lints all Go files 

`make docker-build` &mdash; builds Docker image of current backend

`make docker-run` &mdash; runs built Docker image on `:8080`