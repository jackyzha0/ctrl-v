.DEFAULT_GOAL := help

help: ## Show all Makefile targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run: ## Start backend
	cd backend && go run .
lint: ## Lint backend
	cd backend && golangci-lint run
docker-build: ## Docker build backend
	docker build -t jzhao2k19/ctrl-v:latest ./backend
docker-run: docker-build ## Start dockerized backend
	docker run -p 8080:8080 jzhao2k19/ctrl-v:latest
gcr: docker-build ## Push to GCR
	docker tag jzhao2k19/ctrl-v:latest gcr.io/ctrl-v-278404/backend && docker push gcr.io/ctrl-v-278404/backend
docker-push: ## Push to Docker Hub
	docker push jzhao2k19/ctrl-v:latest
fe-run: ## Start Frontend
	cd frontend && yarn start
fe-build: ## Productionize Frontend
	cd frontend && yarn build
fe-deploy: fe-build ## Deploy frontend to Firebase
	cd frontend && firebase deploy
dev: ## Start backend and frontend
	make -j 2 run fe-run
deploy: ## Deploy backend and frontend
	gcr && fe-deploy