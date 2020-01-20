#!/bin/bash

docker rm -f sb_app06_8082
docker rm -f sb_app06_8084
docker rm -f sb_app06_db
docker rmi sb_app06_image

docker volume rm sb_app06_db_volume
docker volume create sb_app06_db_volume

docker run \
    --detach \
    --name=sb_app06_db \
    -p 3306:3306 \
    --env="MYSQL_ROOT_PASSWORD=password" \
    --env="MYSQL_DATABASE=sb_db" \
    --env="MYSQL_USER=dbuser" \
    --env="MYSQL_PASSWORD=password" \
    --mount source=sb_app06_db_volume,target=/var/lib/mysql \
    mysql:latest

mvn clean install

docker build . -t sb_app06_image

docker run -it \
  --name sb_app06_8082 \
  --link sb_app06_db \
  -p 8082:8080 \
  -d sb_app06_image

docker run -it \
  --name sb_app06_8084 \
  --link sb_app06_db \
  -p 8084:8080 \
  -d sb_app06_image
