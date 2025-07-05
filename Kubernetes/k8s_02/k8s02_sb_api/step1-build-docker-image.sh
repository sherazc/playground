#!/usr/bin/env bash

./gradlew clean build
docker build -t k8s02-sb-api-image .

