## Build stage
FROM golang:alpine AS builder
ENV GO111MODULE=on

# Copy files to image
COPY . /app/src
WORKDIR /app/src

RUN apk add git ca-certificates

# Build image
RUN CGO_ENABLED=0 GOOS=linux go build -o /go/bin/app

## Image creation stage
FROM scratch

# Copy app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /go/bin/app ./
COPY .env ./

# Expose ports, change port to whatever you need to expose
EXPOSE 8080

# Run app
ENTRYPOINT ["./app"]