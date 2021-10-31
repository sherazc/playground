#!/bin/bash

# HELP
# kubectl --help
# kubectl get --help
# kubectl get pod --help


kubectl get all

kubectl get configmap
kubectl get secret
kubectl get pod -o wide
kubectl get deployment
kubectl get service -o wide
kubectl get replicaset

# get ipaddress to access internal IP
kubectl get node -o wide



# kubectl describe pod mongo-deployment-7875498c-54dkw
# kubectl describe pod webapp-deployment-dcffd6bcc-j5vn2

kubectl describe service mongo-service
kubectl describe service webapp-service

kubectl describe deployment mongo-deployment
kubectl describe deployment webapp-deployment

# kubectl describe replicaset mongo-deployment-7875498c
# kubectl describe replicaset webapp-deployment-dcffd6bcc


# pod logs
# kubectl logs mongo-deployment-7875498c-54dkw
# kubectl logs webapp-deployment-dcffd6bcc-j5vn2


# pod logs stream/tail
# kubectl logs mongo-deployment-7875498c-54dkw -f
# kubectl logs webapp-deployment-dcffd6bcc-j5vn2 -f

