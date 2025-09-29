#!/bin/bash

# Local Docker Development Script for React Bank Frontend
# This script helps you build and run the React frontend locally with Docker
# 
# Usage:
#   ./docker-local.sh build    - Build the Docker image
#   ./docker-local.sh run      - Run the container
#   ./docker-local.sh stop     - Stop and remove the container
#   ./docker-local.sh logs     - Show container logs
#   ./docker-local.sh shell    - Access container shell
#   ./docker-local.sh clean    - Clean up images and containers

set -e

# Configuration
IMAGE_NAME="react-bank-frontend"
CONTAINER_NAME="react-bank-frontend-local"
PORT="3001"  # Local port to access the app

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${GREEN}==> $1${NC}"
}

print_info() {
    echo -e "${BLUE}Info: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}Warning: $1${NC}"
}

print_error() {
    echo -e "${RED}Error: $1${NC}"
}

# Function to build Docker image
build_image() {
    print_step "Building Docker image..."
    
    # Check if Dockerfile exists
    if [ ! -f "DockerFile" ]; then
        print_error "DockerFile not found in current directory"
        exit 1
    fi
    
    # Build the image
    docker build -t $IMAGE_NAME:latest .
    
    print_info "Image built successfully: $IMAGE_NAME:latest"
    print_info "Image size: $(docker images $IMAGE_NAME:latest --format "table {{.Size}}" | tail -n 1)"
}

# Function to run Docker container
run_container() {
    print_step "Starting Docker container..."
    
    # Stop existing container if running
    stop_container_silent
    
    # Run the container
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:80 \
        --restart unless-stopped \
        $IMAGE_NAME:latest
    
    print_info "Container started successfully!"
    print_info "Application is accessible at: http://localhost:$PORT"
    print_info "Health check endpoint: http://localhost:$PORT/health"
    print_info "Container name: $CONTAINER_NAME"
    
    # Wait a moment and check if container is still running
    sleep 2
    if docker ps | grep -q $CONTAINER_NAME; then
        print_info "Container is running successfully"
    else
        print_error "Container failed to start. Check logs with: $0 logs"
        exit 1
    fi
}

# Function to stop container (silent)
stop_container_silent() {
    if docker ps -a | grep -q $CONTAINER_NAME; then
        docker stop $CONTAINER_NAME > /dev/null 2>&1 || true
        docker rm $CONTAINER_NAME > /dev/null 2>&1 || true
    fi
}

# Function to stop container
stop_container() {
    print_step "Stopping Docker container..."
    
    if docker ps | grep -q $CONTAINER_NAME; then
        docker stop $CONTAINER_NAME
        print_info "Container stopped"
    else
        print_warning "Container is not running"
    fi
    
    if docker ps -a | grep -q $CONTAINER_NAME; then
        docker rm $CONTAINER_NAME
        print_info "Container removed"
    fi
}

# Function to show logs
show_logs() {
    print_step "Showing container logs..."
    
    if docker ps -a | grep -q $CONTAINER_NAME; then
        docker logs -f $CONTAINER_NAME
    else
        print_error "Container '$CONTAINER_NAME' not found"
        exit 1
    fi
}

# Function to access container shell
access_shell() {
    print_step "Accessing container shell..."
    
    if docker ps | grep -q $CONTAINER_NAME; then
        print_info "Entering container shell. Type 'exit' to return."
        docker exec -it $CONTAINER_NAME /bin/sh
    else
        print_error "Container is not running. Start it first with: $0 run"
        exit 1
    fi
}

# Function to clean up
cleanup() {
    print_step "Cleaning up Docker resources..."
    
    # Stop and remove container
    stop_container_silent
    
    # Remove image
    if docker images | grep -q $IMAGE_NAME; then
        docker rmi $IMAGE_NAME:latest
        print_info "Image removed"
    fi
    
    # Remove dangling images
    if [ "$(docker images -f "dangling=true" -q)" ]; then
        docker rmi $(docker images -f "dangling=true" -q)
        print_info "Dangling images removed"
    fi
    
    print_info "Cleanup completed"
}

# Function to show status
show_status() {
    print_step "Container Status:"
    
    if docker ps | grep -q $CONTAINER_NAME; then
        echo -e "${GREEN}✓ Container is running${NC}"
        echo "Container ID: $(docker ps | grep $CONTAINER_NAME | awk '{print $1}')"
        echo "Port mapping: $PORT:80"
        echo "Access URL: http://localhost:$PORT"
    elif docker ps -a | grep -q $CONTAINER_NAME; then
        echo -e "${YELLOW}⚠ Container exists but is not running${NC}"
    else
        echo -e "${RED}✗ Container not found${NC}"
    fi
    
    if docker images | grep -q $IMAGE_NAME; then
        echo -e "${GREEN}✓ Image exists${NC}"
        echo "Image: $IMAGE_NAME:latest"
    else
        echo -e "${RED}✗ Image not found${NC}"
    fi
}

# Main script
case "${1:-help}" in
    build)
        build_image
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    logs)
        show_logs
        ;;
    shell)
        access_shell
        ;;
    clean)
        cleanup
        ;;
    status)
        show_status
        ;;
    help|*)
        echo "Local Docker Development Helper for React Bank Frontend"
        echo ""
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  build   Build the Docker image"
        echo "  run     Run the container (stops existing container first)"
        echo "  stop    Stop and remove the container"
        echo "  logs    Show container logs (follow mode)"
        echo "  shell   Access container shell"
        echo "  status  Show container and image status"
        echo "  clean   Remove container and image"
        echo "  help    Show this help message"
        echo ""
        echo "Quick Start:"
        echo "  $0 build && $0 run"
        echo ""
        echo "Access your app at: http://localhost:$PORT"
        ;;
esac