#!/usr/bin/env bash

docker stop redis
docker rm redis

docker run -d -p 6379:6379 \
  --name redis \
  redis
