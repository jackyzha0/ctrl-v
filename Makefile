.DEFAULT_GOAL := help

help: ## Show all Makefile targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run: ## Start backend
	cd backend && go run .
lint: ## Lint backend
	cd backend && golangci-lint run
docker-build: ## Docker build backend
	docker build -t ctrl-v:latest ./backend
docker-run: docker-build ## Start dockerized backend
	docker run -p 8080:8080 ctrl-v:latest

fe-run: ## Start Frontend
	cd frontend && yarn start
fe-build: ## Productionize Frontend
	cd frontend && yarn build
dev: ## Start backend and frontend
	make -j 2 run fe-run