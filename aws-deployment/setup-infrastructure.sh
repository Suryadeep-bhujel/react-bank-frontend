#!/bin/bash

# AWS ECS Infrastructure Setup Script for React Bank Frontend
# This script creates the necessary AWS infrastructure for deploying the React frontend
# 
# This script creates:
# - ECR repository
# - ECS cluster
# - Application Load Balancer and Target Group
# - Security Groups
# - CloudWatch Log Group
# - IAM roles (if they don't exist)

set -e

# Configuration variables - Update these for your environment
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="123456789012"  # Replace with your AWS account ID
ECR_REPOSITORY="react-bank-frontend"
CLUSTER_NAME="react-bank-cluster"
VPC_ID="vpc-12345678"  # Replace with your VPC ID
SUBNET_1="subnet-12345678"  # Replace with your subnet IDs
SUBNET_2="subnet-87654321"
ALB_NAME="react-bank-frontend-alb"
TARGET_GROUP_NAME="react-bank-frontend-tg"

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

# Function to check if AWS CLI is configured
check_aws_cli() {
    print_step "Checking AWS CLI configuration..."
    if ! aws sts get-caller-identity > /dev/null 2>&1; then
        print_error "AWS CLI is not configured or credentials are invalid"
        exit 1
    fi
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    echo "AWS CLI is configured correctly for account: $AWS_ACCOUNT_ID"
}

# Function to create ECR repository
create_ecr_repository() {
    print_step "Creating ECR repository..."
    
    if aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION > /dev/null 2>&1; then
        print_info "ECR repository '$ECR_REPOSITORY' already exists"
    else
        aws ecr create-repository \
            --repository-name $ECR_REPOSITORY \
            --region $AWS_REGION
        
        # Set lifecycle policy to manage image retention
        aws ecr put-lifecycle-configuration \
            --repository-name $ECR_REPOSITORY \
            --lifecycle-policy-text '{
                "rules": [
                    {
                        "rulePriority": 1,
                        "description": "Keep last 10 images",
                        "selection": {
                            "tagStatus": "any",
                            "countType": "imageCountMoreThan",
                            "countNumber": 10
                        },
                        "action": {
                            "type": "expire"
                        }
                    }
                ]
            }' \
            --region $AWS_REGION
        
        print_info "ECR repository created successfully"
    fi
}

# Function to create ECS cluster
create_ecs_cluster() {
    print_step "Creating ECS cluster..."
    
    if aws ecs describe-clusters --clusters $CLUSTER_NAME --region $AWS_REGION | grep -q "ACTIVE"; then
        print_info "ECS cluster '$CLUSTER_NAME' already exists"
    else
        aws ecs create-cluster \
            --cluster-name $CLUSTER_NAME \
            --capacity-providers FARGATE \
            --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
            --region $AWS_REGION
        
        print_info "ECS cluster created successfully"
    fi
}

# Function to create security group
create_security_group() {
    print_step "Creating security group..."
    
    SG_NAME="react-bank-frontend-sg"
    
    # Check if security group already exists
    if aws ec2 describe-security-groups --filters "Name=group-name,Values=$SG_NAME" --region $AWS_REGION | grep -q "GroupId"; then
        SECURITY_GROUP_ID=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=$SG_NAME" --query 'SecurityGroups[0].GroupId' --output text --region $AWS_REGION)
        print_info "Security group '$SG_NAME' already exists: $SECURITY_GROUP_ID"
    else
        # Create security group
        SECURITY_GROUP_ID=$(aws ec2 create-security-group \
            --group-name $SG_NAME \
            --description "Security group for React Bank Frontend" \
            --vpc-id $VPC_ID \
            --query 'GroupId' \
            --output text \
            --region $AWS_REGION)
        
        # Add inbound rules
        aws ec2 authorize-security-group-ingress \
            --group-id $SECURITY_GROUP_ID \
            --protocol tcp \
            --port 80 \
            --cidr 0.0.0.0/0 \
            --region $AWS_REGION
        
        aws ec2 authorize-security-group-ingress \
            --group-id $SECURITY_GROUP_ID \
            --protocol tcp \
            --port 443 \
            --cidr 0.0.0.0/0 \
            --region $AWS_REGION
        
        print_info "Security group created successfully: $SECURITY_GROUP_ID"
    fi
    
    echo "SECURITY_GROUP_ID=$SECURITY_GROUP_ID"
}

# Function to create Application Load Balancer
create_alb() {
    print_step "Creating Application Load Balancer..."
    
    if aws elbv2 describe-load-balancers --names $ALB_NAME --region $AWS_REGION > /dev/null 2>&1; then
        print_info "Load balancer '$ALB_NAME' already exists"
        ALB_ARN=$(aws elbv2 describe-load-balancers --names $ALB_NAME --query 'LoadBalancers[0].LoadBalancerArn' --output text --region $AWS_REGION)
    else
        # Create load balancer
        ALB_ARN=$(aws elbv2 create-load-balancer \
            --name $ALB_NAME \
            --subnets $SUBNET_1 $SUBNET_2 \
            --security-groups $SECURITY_GROUP_ID \
            --scheme internet-facing \
            --type application \
            --ip-address-type ipv4 \
            --query 'LoadBalancers[0].LoadBalancerArn' \
            --output text \
            --region $AWS_REGION)
        
        print_info "Load balancer created successfully"
    fi
    
    echo "ALB_ARN=$ALB_ARN"
}

# Function to create Target Group
create_target_group() {
    print_step "Creating Target Group..."
    
    if aws elbv2 describe-target-groups --names $TARGET_GROUP_NAME --region $AWS_REGION > /dev/null 2>&1; then
        print_info "Target group '$TARGET_GROUP_NAME' already exists"
        TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups --names $TARGET_GROUP_NAME --query 'TargetGroups[0].TargetGroupArn' --output text --region $AWS_REGION)
    else
        # Create target group
        TARGET_GROUP_ARN=$(aws elbv2 create-target-group \
            --name $TARGET_GROUP_NAME \
            --protocol HTTP \
            --port 80 \
            --vpc-id $VPC_ID \
            --target-type ip \
            --health-check-protocol HTTP \
            --health-check-path /health \
            --health-check-interval-seconds 30 \
            --health-check-timeout-seconds 10 \
            --healthy-threshold-count 2 \
            --unhealthy-threshold-count 3 \
            --matcher HttpCode=200 \
            --query 'TargetGroups[0].TargetGroupArn' \
            --output text \
            --region $AWS_REGION)
        
        print_info "Target group created successfully"
    fi
    
    echo "TARGET_GROUP_ARN=$TARGET_GROUP_ARN"
}

# Function to create ALB listener
create_alb_listener() {
    print_step "Creating ALB listener..."
    
    # Check if listener already exists
    if aws elbv2 describe-listeners --load-balancer-arn $ALB_ARN --region $AWS_REGION | grep -q "ListenerArn"; then
        print_info "ALB listener already exists"
    else
        # Create listener
        aws elbv2 create-listener \
            --load-balancer-arn $ALB_ARN \
            --protocol HTTP \
            --port 80 \
            --default-actions Type=forward,TargetGroupArn=$TARGET_GROUP_ARN \
            --region $AWS_REGION
        
        print_info "ALB listener created successfully"
    fi
}

# Function to create CloudWatch log group
create_log_group() {
    print_step "Creating CloudWatch log group..."
    
    if aws logs describe-log-groups --log-group-name-prefix "/ecs/react-bank-frontend" --region $AWS_REGION | grep -q "/ecs/react-bank-frontend"; then
        print_info "Log group already exists"
    else
        aws logs create-log-group \
            --log-group-name "/ecs/react-bank-frontend" \
            --region $AWS_REGION
        
        # Set retention policy
        aws logs put-retention-policy \
            --log-group-name "/ecs/react-bank-frontend" \
            --retention-in-days 30 \
            --region $AWS_REGION
        
        print_info "Log group created successfully"
    fi
}

# Function to create IAM roles
create_iam_roles() {
    print_step "Creating IAM roles..."
    
    # Create ECS Task Execution Role
    if aws iam get-role --role-name ecsTaskExecutionRole > /dev/null 2>&1; then
        print_info "ECS Task Execution Role already exists"
    else
        aws iam create-role \
            --role-name ecsTaskExecutionRole \
            --assume-role-policy-document '{
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {
                            "Service": "ecs-tasks.amazonaws.com"
                        },
                        "Action": "sts:AssumeRole"
                    }
                ]
            }'
        
        aws iam attach-role-policy \
            --role-name ecsTaskExecutionRole \
            --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
        
        print_info "ECS Task Execution Role created"
    fi
    
    # Create ECS Task Role
    if aws iam get-role --role-name ecsTaskRole > /dev/null 2>&1; then
        print_info "ECS Task Role already exists"
    else
        aws iam create-role \
            --role-name ecsTaskRole \
            --assume-role-policy-document '{
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {
                            "Service": "ecs-tasks.amazonaws.com"
                        },
                        "Action": "sts:AssumeRole"
                    }
                ]
            }'
        
        print_info "ECS Task Role created"
    fi
}

# Function to update configuration files
update_config_files() {
    print_step "Updating configuration files..."
    
    # Update task definition
    sed -i.bak "s/YOUR_ACCOUNT_ID/$AWS_ACCOUNT_ID/g" ecs/task-definition.json
    sed -i.bak "s/YOUR_REGION/$AWS_REGION/g" ecs/task-definition.json
    
    # Update service definition
    sed -i.bak "s/YOUR_ACCOUNT_ID/$AWS_ACCOUNT_ID/g" ecs/service-definition.json
    sed -i.bak "s/YOUR_REGION/$AWS_REGION/g" ecs/service-definition.json
    sed -i.bak "s/subnet-12345678/$SUBNET_1/g" ecs/service-definition.json
    sed -i.bak "s/subnet-87654321/$SUBNET_2/g" ecs/service-definition.json
    sed -i.bak "s/sg-12345678/$SECURITY_GROUP_ID/g" ecs/service-definition.json
    sed -i.bak "s|arn:aws:elasticloadbalancing:YOUR_REGION:YOUR_ACCOUNT_ID:targetgroup/react-bank-frontend-tg/.*|$TARGET_GROUP_ARN|g" ecs/service-definition.json
    
    print_info "Configuration files updated"
}

# Main function
main() {
    echo "Setting up AWS ECS infrastructure for React Bank Frontend..."
    echo "Region: $AWS_REGION"
    echo ""
    
    check_aws_cli
    create_ecr_repository
    create_ecs_cluster
    create_security_group
    create_alb
    create_target_group
    create_alb_listener
    create_log_group
    create_iam_roles
    update_config_files
    
    print_step "Infrastructure setup completed successfully!"
    echo ""
    print_info "Next steps:"
    echo "1. Update the VPC_ID, SUBNET_1, and SUBNET_2 variables in this script"
    echo "2. Run the deployment script: ./deploy.sh"
    echo "3. Access your application via the Load Balancer DNS name"
    echo ""
    echo "Load Balancer DNS: $(aws elbv2 describe-load-balancers --names $ALB_NAME --query 'LoadBalancers[0].DNSName' --output text --region $AWS_REGION)"
}

# Run main function
main