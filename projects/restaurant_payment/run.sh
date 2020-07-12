#!/usr/bin/env bash
echo "========================="
echo "==== PROVISION & RUN ===="
echo "========================="


echo "==== Create mount folder ===="
# Create mount folders
mkdir -p app-mount/logs

echo "==== Create network ===="
docker network rm rp-network
docker network create --driver=bridge rp-network

./run-db.sh

read -t 30 -p "Pausing... Giving rp-db-container 30 seconds to bootup."
# echo "Pausing... Giving rp-db-container 30 seconds to bootup." && sleep 30s

echo "==== Run rp-container ===="
docker container rm -f rp-container
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

docker logs -f rp-container
