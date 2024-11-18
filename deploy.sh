#!/bin/bash

# Start Minikube
echo "Starting Minikube..."
minikube start

# Use Minikube Docker environment
echo "Setting up Minikube Docker environment..."
eval $(minikube docker-env)

# Build Docker images
echo "Building Docker images..."
docker build -t weather-backend ./weather-backend
docker build -t weather-frontend ./weather-frontend

# Deploy to Kubernetes
echo "Deploying to Kubernetes..."
kubectl apply -f weather-backend/backend-deployment.yaml
kubectl apply -f weather-frontend/frontend-deployment.yaml

# Expose services
echo "Exposing services..."
minikube service weather-backend-service
minikube service weather-frontend-service
