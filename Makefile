run:
	cd backend && go run .
lint:
	cd backend && golangci-lint run
docker-build:
	docker build -t jzhao2k19/ctrl-v:latest ./backend
docker-run: docker-build
	docker run -p 8080:8080 jzhao2k19/ctrl-v:latest
gcr: docker-build
	docker tag jzhao2k19/ctrl-v:latest gcr.io/ctrl-v-278404/backend && docker push gcr.io/ctrl-v-278404/backend
docker-push:
	docker push jzhao2k19/ctrl-v:latest
fe-run:
	cd frontend && yarn start
fe-build:
	cd frontend && yarn build
fe-deploy: fe-build
	cd frontend && firebase deploy
dev:
	make -j 2 run fe-run
deploy:
	gcr && fe-deploy