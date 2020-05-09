run:
		go run .
lint:
		golangci-lint run
docker-build:
		docker build -t jzhao2k19/ctrl-v:latest .
docker-run:
		docker run -p 8080:8080 jzhao2k19/ctrl-v:latest
docker-all: docker-build docker-run
docker-push:
		docker push jzhao2k19/ctrl-v:latest