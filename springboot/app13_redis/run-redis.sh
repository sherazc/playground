#!/usr/bin/env bash

docker run -d -p 6379:6379 \
  --name redis \
  redis
