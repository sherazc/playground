#!/usr/bin/env bash

docker run -itd \
  --name rp-server-container \
  -p 8082:8082 \
  -p 8084:8084 \
  -p 8086:8086 \
  rp-server-image


docker ps -a

date