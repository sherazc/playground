#!/usr/bin/env bash
echo "=================="
echo "==== DB ===="
echo "=================="

rm -rf app-mount

# Cleaning DB container
docker rm -f rp-db-container

# Clean image
# docker rmi mysql:5.7
docker rmi rp-db-image

docker build . -t rp-db-image

# Run
docker run \
  -itd \
  --name=rp-db-container \
  -p 3306:3306 \
  --env="MYSQL_ROOT_PASSWORD=password" \
  --env="MYSQL_USER=dbuser" \
  --env="MYSQL_PASSWORD=password" \
  -v $PWD/app-mount/mysql-data:/var/lib/mysql \
  rp-db-image

date
