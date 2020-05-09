## Build stage
FROM golang:alpine AS builder
ENV GO111MODULE=on

# Copy files to image
COPY . /app/src
WORKDIR /app/src

RUN apk add git ca-certificates
RUN go mod download

# Build image
RUN CGO_ENABLED=0 GOOS=linux go build -o /go/bin/app

## Image creation stage
FROM scratch

# Copy app
COPY --from=builder /go/bin/app /go/bin/app

# Expose ports, change port to whatever you need to expose
EXPOSE 8080

# Run app
ENTRYPOINT ["/go/bin/app"]