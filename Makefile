# Deployment scripts for Koyeb

# Build and test locally
.PHONY: build
build:
	docker build -t oussema-portfolio .

# Run locally
.PHONY: run
run:
	docker run -p 3000:3000 oussema-portfolio

# Development with hot reload
.PHONY: dev
dev:
	docker-compose --profile dev up

# Development with rebuild
.PHONY: dev-build
dev-build:
	docker-compose --profile dev up --build

# Stop development
.PHONY: dev-stop
dev-stop:
	docker-compose --profile dev down

# Build for production
.PHONY: build-prod
build-prod:
	docker build -t oussema-portfolio:latest .

# Push to Docker Hub (replace with your username)
.PHONY: push
push:
	docker tag oussema-portfolio:latest yourusername/oussema-portfolio:latest
	docker push yourusername/oussema-portfolio:latest

# Deploy to Koyeb
.PHONY: deploy
deploy: build-prod push
	@echo "Deploy to Koyeb using: koyeb service create --name oussema-portfolio --image yourusername/oussema-portfolio:latest"

# Clean up
.PHONY: clean
clean:
	docker system prune -f
	docker image rm oussema-portfolio:latest || true
