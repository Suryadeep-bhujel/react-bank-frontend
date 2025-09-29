# React Bank Frontend - Deployment Guide

This guide provides comprehensive instructions for deploying the React Bank Frontend application both locally using Docker and to AWS ECS (Elastic Container Service).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Docker Deployment](#local-docker-deployment)
3. [AWS ECS Deployment](#aws-ecs-deployment)
4. [Configuration Files](#configuration-files)
5. [Troubleshooting](#troubleshooting)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Prerequisites

### General Requirements
- Node.js 18+ installed
- Docker installed and running
- Git installed

### AWS ECS Requirements
- AWS CLI installed and configured
- AWS account with appropriate permissions
- ECR repository access
- VPC with public subnets
- Internet Gateway configured

### Required AWS Permissions
Your AWS user/role needs the following permissions:
- `AmazonECS_FullAccess`
- `AmazonEC2ContainerRegistryFullAccess`
- `ElasticLoadBalancingFullAccess`
- `CloudWatchLogsFullAccess`
- `IAMFullAccess` (for role creation)
- `AmazonEC2FullAccess` (for VPC and security groups)

## Local Docker Deployment

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react-bank-frontend
   ```

2. **Build and run with Docker:**
   ```bash
   # Build the Docker image
   ./docker-local.sh build
   
   # Run the container
   ./docker-local.sh run
   ```

3. **Access the application:**
   - Open your browser and navigate to `http://localhost:3001`
   - Health check: `http://localhost:3001/health`

### Available Docker Commands

The `docker-local.sh` script provides several commands:

```bash
# Build the Docker image
./docker-local.sh build

# Run the container (stops existing container first)
./docker-local.sh run

# Stop and remove the container
./docker-local.sh stop

# Show container logs
./docker-local.sh logs

# Access container shell
./docker-local.sh shell

# Show container status
./docker-local.sh status

# Clean up (remove container and image)
./docker-local.sh clean

# Show help
./docker-local.sh help
```

### Manual Docker Commands

If you prefer to run Docker commands manually:

```bash
# Build the image
docker build -t react-bank-frontend:latest .

# Run the container
docker run -d \
  --name react-bank-frontend-local \
  -p 3001:80 \
  react-bank-frontend:latest

# View logs
docker logs -f react-bank-frontend-local

# Stop and remove
docker stop react-bank-frontend-local
docker rm react-bank-frontend-local
```

## AWS ECS Deployment

### Step 1: Configure AWS CLI

```bash
# Configure AWS CLI (if not already done)
aws configure

# Verify configuration
aws sts get-caller-identity
```

### Step 2: Update Configuration

1. **Edit deployment configuration:**
   ```bash
   # Update these files with your AWS account details:
   # - aws-deployment/deploy.sh
   # - aws-deployment/setup-infrastructure.sh
   ```

2. **Required configuration changes:**
   - `AWS_ACCOUNT_ID`: Your AWS account ID
   - `AWS_REGION`: Your preferred AWS region
   - `VPC_ID`: Your VPC ID
   - `SUBNET_1` and `SUBNET_2`: Your public subnet IDs

### Step 3: Set Up Infrastructure

```bash
# Navigate to deployment directory
cd aws-deployment

# Make scripts executable (if not already done)
chmod +x *.sh

# Set up AWS infrastructure
./setup-infrastructure.sh
```

This script creates:
- ECR repository for storing Docker images
- ECS cluster for running containers
- Application Load Balancer for traffic distribution
- Target Group for health checks
- Security Groups for network access
- CloudWatch Log Group for logging
- IAM roles for ECS tasks

### Step 4: Deploy the Application

```bash
# Full deployment (build, push, and deploy)
./deploy.sh

# Or use specific commands:
./deploy.sh build-only          # Only build and push image
./deploy.sh update-service-only # Only update ECS service
```

### Step 5: Verify Deployment

1. **Check ECS Console:**
   - Navigate to AWS ECS Console
   - Verify the cluster is running
   - Check service status and task health

2. **Access the application:**
   - Get the Load Balancer DNS name from the AWS Console
   - Access your application via the ALB DNS name
   - Health check: `http://<alb-dns-name>/health`

## Configuration Files

### Dockerfile

The multi-stage Dockerfile:
- **Stage 1 (Build):** Uses Node.js 18 Alpine to build the React application
- **Stage 2 (Runtime):** Uses Nginx Alpine to serve the static files

Key features:
- Optimized for production with multi-stage build
- Uses nginx for efficient static file serving
- Includes health check endpoint
- Proper file permissions and security

### nginx.conf

The nginx configuration includes:
- **SPA Support:** Client-side routing with fallback to index.html
- **Gzip Compression:** Reduces bandwidth usage
- **Security Headers:** Basic security hardening
- **Caching:** Optimized caching for static assets
- **API Proxy:** Ready for backend API integration
- **Health Check:** Endpoint for load balancer health checks

### AWS ECS Configuration

#### Task Definition (task-definition.json)
- **CPU/Memory:** 256 CPU units, 512 MB memory
- **Network Mode:** awsvpc for better network isolation
- **Logging:** CloudWatch logs integration
- **Health Check:** Container-level health monitoring

#### Service Definition (service-definition.json)
- **Desired Count:** 2 instances for high availability
- **Load Balancer:** Integration with Application Load Balancer
- **Deployment:** Rolling deployment with circuit breaker
- **Network:** VPC configuration with public subnets

#### Load Balancer Configuration (alb-target-group.json)
- **Health Check:** HTTP health checks on /health endpoint
- **Sticky Sessions:** Disabled for stateless application
- **Deregistration Delay:** 30 seconds for faster deployments

## Environment Variables

### Build-time Variables
- `NODE_ENV`: Set to "production" for optimized builds

### Runtime Variables
- `PORT`: Container port (default: 80)

### AWS-specific Variables
Update these in the deployment scripts:
- `AWS_REGION`: Your AWS region
- `AWS_ACCOUNT_ID`: Your AWS account ID
- `ECR_REPOSITORY`: ECR repository name
- `CLUSTER_NAME`: ECS cluster name
- `SERVICE_NAME`: ECS service name

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check for TypeScript errors
npm run build

# Install dependencies
npm install

# Clear cache
npm cache clean --force
```

#### Docker Issues
```bash
# Check Docker is running
docker --version

# Clean up Docker resources
docker system prune -a

# Check container logs
./docker-local.sh logs
```

#### AWS Deployment Issues

1. **ECR Login Issues:**
   ```bash
   # Refresh ECR login
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   ```

2. **ECS Service Issues:**
   ```bash
   # Check service events
   aws ecs describe-services --cluster react-bank-cluster --services react-bank-frontend-service

   # Check task definitions
   aws ecs describe-task-definition --task-definition react-bank-frontend-task
   ```

3. **Load Balancer Issues:**
   ```bash
   # Check target group health
   aws elbv2 describe-target-health --target-group-arn <target-group-arn>
   ```

### Logs and Monitoring

#### Local Docker Logs
```bash
# Follow logs
./docker-local.sh logs

# Or directly with Docker
docker logs -f react-bank-frontend-local
```

#### AWS CloudWatch Logs
- Navigate to CloudWatch Console
- Look for log group: `/ecs/react-bank-frontend`
- Filter by time range and log level

#### ECS Container Insights
Enable Container Insights for detailed metrics:
```bash
aws ecs put-account-setting --name containerInsights --value enabled
```

## Monitoring and Maintenance

### Health Checks

The application includes a health check endpoint at `/health` that returns:
- Status: 200 OK
- Response: "healthy"

### Application Monitoring

1. **CloudWatch Metrics:**
   - CPU utilization
   - Memory utilization
   - Request count
   - Response time

2. **Load Balancer Metrics:**
   - Target health
   - Request count
   - Error rates

### Maintenance Tasks

#### Regular Updates
```bash
# Update dependencies
npm audit fix

# Rebuild and redeploy
./deploy.sh
```

#### Scaling
```bash
# Update desired count in service-definition.json
# Then run:
./deploy.sh update-service-only
```

#### Cost Optimization
- Monitor CloudWatch costs
- Consider using Spot instances for non-production
- Implement auto-scaling based on metrics

## Security Considerations

### Container Security
- Uses non-root user when possible
- Minimal base image (Alpine Linux)
- No sensitive data in image layers

### Network Security
- Security groups restrict access to necessary ports
- Load balancer handles SSL termination
- VPC provides network isolation

### Secrets Management
- Use AWS Secrets Manager for sensitive configuration
- Never include secrets in Docker images
- Use environment variables for configuration

## Additional Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

## Support

For issues related to:
- **Application bugs:** Create an issue in the repository
- **AWS deployment:** Check AWS documentation and support
- **Docker issues:** Check Docker documentation

---

**Note:** This deployment guide assumes a production environment. For development or testing, consider using simpler configurations or local development servers.