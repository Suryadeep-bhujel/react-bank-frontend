#!/bin/bash

# AWS ECS Deployment Script for React Bank Frontend
# This script automates the deployment of the React frontend to AWS ECS
# 
# Prerequisites:
# - AWS CLI configured with appropriate permissions
# - Docker installed and running
# - ECR repository created
# - ECS cluster created
# - VPC, subnets, and security groups configured

set -e

# Configuration variables - Update these for your environment
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="123456789012"  # Replace with your AWS account ID
ECR_REPOSITORY="react-bank-frontend"
IMAGE_TAG="latest"
CLUSTER_NAME="react-bank-cluster"
SERVICE_NAME="react-bank-frontend-service"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${GREEN}==> $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}Warning: $1${NC}"
}

print_error() {
    echo -e "${RED}Error: $1${NC}"
}

# Function to check if AWS CLI is configured
check_aws_cli() {
    print_step "Checking AWS CLI configuration..."
    if ! aws sts get-caller-identity > /dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        exit 1
    fi
    echo "AWS CLI is configured correctly"
}

# Function to build and push Docker image
build_and_push_image() {
    print_step "Building Docker image..."
    
    # Build the Docker image
    docker build -t $ECR_REPOSITORY:$IMAGE_TAG .
    
    # Get ECR login token and login to ECR
    print_step "Logging into Amazon ECR..."
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
    
    # Tag image for ECR
    docker tag $ECR_REPOSITORY:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
    
    # Push image to ECR
    print_step "Pushing image to ECR..."
    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
    
    echo "Image pushed successfully!"
}

# Function to update task definition
update_task_definition() {
    print_step "Updating ECS task definition..."
    
    # Update the task definition with current account ID and region
    sed -i.bak "s/YOUR_ACCOUNT_ID/$AWS_ACCOUNT_ID/g" aws-deployment/ecs/task-definition.json
    sed -i.bak "s/YOUR_REGION/$AWS_REGION/g" aws-deployment/ecs/task-definition.json
    
    # Register new task definition
    aws ecs register-task-definition \
        --cli-input-json file://aws-deployment/ecs/task-definition.json \
        --region $AWS_REGION
    
    echo "Task definition updated successfully!"
}

# Function to update ECS service
update_service() {
    print_step "Updating ECS service..."
    
    # Update the service to use the new task definition
    aws ecs update-service \
        --cluster $CLUSTER_NAME \
        --service $SERVICE_NAME \
        --task-definition react-bank-frontend-task \
        --region $AWS_REGION
    
    print_step "Waiting for service to stabilize..."
    aws ecs wait services-stable \
        --cluster $CLUSTER_NAME \
        --services $SERVICE_NAME \
        --region $AWS_REGION
    
    echo "Service updated successfully!"
}

# Function to create CloudWatch log group
create_log_group() {
    print_step "Creating CloudWatch log group..."
    
    if aws logs describe-log-groups --log-group-name-prefix "/ecs/react-bank-frontend" --region $AWS_REGION | grep -q "/ecs/react-bank-frontend"; then
        echo "Log group already exists"
    else
        aws logs create-log-group \
            --log-group-name "/ecs/react-bank-frontend" \
            --region $AWS_REGION
        echo "Log group created successfully!"
    fi
}

# Main deployment function
main() {
    echo "Starting deployment of React Bank Frontend to AWS ECS..."
    echo "Region: $AWS_REGION"
    echo "Account ID: $AWS_ACCOUNT_ID"
    echo "ECR Repository: $ECR_REPOSITORY"
    echo "Image Tag: $IMAGE_TAG"
    echo ""
    
    check_aws_cli
    create_log_group
    build_and_push_image
    update_task_definition
    update_service
    
    print_step "Deployment completed successfully!"
    print_warning "Don't forget to restore the original task-definition.json if needed"
    echo "You can monitor your deployment in the AWS ECS console:"
    echo "https://$AWS_REGION.console.aws.amazon.com/ecs/home?region=$AWS_REGION#/clusters/$CLUSTER_NAME/services/$SERVICE_NAME/details"
}

# Parse command line arguments
case "${1:-deploy}" in
    deploy)
        main
        ;;
    build-only)
        check_aws_cli
        build_and_push_image
        ;;
    update-service-only)
        check_aws_cli
        update_task_definition
        update_service
        ;;
    *)
        echo "Usage: $0 [deploy|build-only|update-service-only]"
        echo "  deploy: Full deployment (default)"
        echo "  build-only: Only build and push Docker image"
        echo "  update-service-only: Only update task definition and service"
        exit 1
        ;;
esac