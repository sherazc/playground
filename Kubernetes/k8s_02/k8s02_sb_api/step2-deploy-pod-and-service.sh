#!/usr/bin/env bash
echo @@@@@@@@@@ deploying pod @@@@@@@@@@
kubectl apply -f k8s-deployment.yaml

echo @@@@@@@@@@ deploying service @@@@@@@@@@
kubectl apply -f k8s-service.yaml

echo @@@@@@@@@@ checking status @@@@@@@@@@
kubectl get deployments
kubectl get pods
kubectl get services
# kubectl logs <pod name> # "kubectl get pods" command prints pod names
