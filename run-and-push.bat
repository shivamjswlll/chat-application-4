@echo off
setlocal enabledelayedexpansion

REM Set your Docker Hub credentials and image name
set DOCKER_USERNAME=shivamjswl
set IMAGE_NAME_1=frontend
set IMAGE_NAME_2=backend
set STACK_NAME=my-app

REM Build the image
echo Building Docker image...
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME_1% ./frontend
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME_2% ./backend

REM Push the image to Docker Hub
echo Pushing image to Docker Hub...
docker push %DOCKER_USERNAME%/%IMAGE_NAME_1%
docker push %DOCKER_USERNAME%/%IMAGE_NAME_2%

REM Leave the swarm and reinitialize
echo Leaving swarm and reinitializing...
docker swarm leave --force
docker swarm init 

REM Deploy the stack
echo Deploying stack %STACK_NAME%...
docker stack deploy -c docker-compose.yml %STACK_NAME%
docker stack ls
echo Deployment completed!