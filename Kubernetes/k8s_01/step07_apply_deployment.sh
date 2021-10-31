#!/bin/bash

kubectl apply -f step03_mongo-config.yml
kubectl apply -f step04_mongo-secret.yml
kubectl apply -f step05_mongo_deployment_and_service.yml
kubectl apply -f step06_webapp_deployment_and_service.yml
