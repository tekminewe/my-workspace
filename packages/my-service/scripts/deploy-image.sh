#!/bin/sh

version=$(date +%s)

pnpm build
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 767398093877.dkr.ecr.us-east-1.amazonaws.com
docker build -t web-service .
docker tag web-service:latest 767398093877.dkr.ecr.us-east-1.amazonaws.com/web-service:$version
docker push 767398093877.dkr.ecr.us-east-1.amazonaws.com/web-service:$version 