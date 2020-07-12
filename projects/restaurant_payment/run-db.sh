#!/usr/bin/env bash

echo "==== Run rp-db-container ===="
docker container rm -f rp-db-container
docker run \
  -itd \
  --name=rp-db-container \
  -p 3306:3306 \
  --env="MYSQL_ROOT_PASSWORD=password" \
  -v $PWD/app-mount/mysql-data:/var/lib/mysql \
  --network rp-network \
  rp-db-image

date
