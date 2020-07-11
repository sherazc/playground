#!/usr/bin/env bash
echo "========================="
echo "==== PROVISION & RUN ===="
echo "========================="


echo "==== Create mount folder ===="
# Create mount folders
mkdir -p app-mount/logs

echo "==== Create network ===="
docker network create --driver=bridge rp-network

echo "==== Run rp-container ===="
docker run -itd \
  --name rp-container \
  -p 8082:8082 \
  -p 8084:8084 \
  -p 8086:8086 \
  -v $PWD/app-mount:/app-mount \
  --network rp-network \
  rp-image

docker ps -a

date