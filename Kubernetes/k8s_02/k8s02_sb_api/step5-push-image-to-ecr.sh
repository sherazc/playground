#!/usr/bin/env bash

docker tag k8s02-sb-api-image:latest 691884051469.dkr.ecr.us-east-1.amazonaws.com/k8s_02_ecr

docker push 691884051469.dkr.ecr.us-east-1.amazonaws.com/k8s_02_ecr
