#!/bin/bash

# Build and Deploy Script for Oussema Trabelsi Portfolio
# This script builds the Docker image and prepares for Koyeb deployment

set -e

echo "🚀 Building Oussema Trabelsi Portfolio..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="oussema-portfolio"
DOCKER_USERNAME="yourusername" # Replace with your Docker Hub username
VERSION="latest"

echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

echo -e "${BLUE}🔨 Building Astro application...${NC}"
npm run build

echo -e "${BLUE}🐳 Building Docker image...${NC}"
docker build -t ${IMAGE_NAME}:${VERSION} .

echo -e "${GREEN}✅ Docker image built successfully!${NC}"

# Ask if user wants to push to Docker Hub
read -p "Do you want to push to Docker Hub? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📤 Tagging image for Docker Hub...${NC}"
    docker tag ${IMAGE_NAME}:${VERSION} ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
    
    echo -e "${BLUE}📤 Pushing to Docker Hub...${NC}"
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
    
    echo -e "${GREEN}✅ Image pushed to Docker Hub successfully!${NC}"
    echo -e "${YELLOW}🔗 Image URL: https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}${NC}"
fi

# Ask if user wants to deploy to Koyeb
read -p "Do you want to deploy to Koyeb? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🚀 Deploying to Koyeb...${NC}"
    echo -e "${YELLOW}Use this command to deploy:${NC}"
    echo -e "${BLUE}koyeb service create --name oussema-portfolio --image ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}${NC}"
fi

echo -e "${GREEN}🎉 Build process completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "1. Update DOCKER_USERNAME in this script"
echo -e "2. Push to Docker Hub: docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"
echo -e "3. Deploy to Koyeb using the Koyeb CLI or dashboard"
echo -e "4. Configure your custom domain: oussematrabelsi.com"
