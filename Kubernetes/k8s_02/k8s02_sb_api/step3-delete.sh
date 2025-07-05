#!/usr/bin/env bash
echo @@@@@@@@@@ deleting pod @@@@@@@@@@
kubectl delete -f k8s-deployment.yaml

echo @@@@@@@@@@ deleting service @@@@@@@@@@
kubectl delete -f k8s-service.yaml

echo @@@@@@@@@@ checking status @@@@@@@@@@
kubectl get deployments
kubectl get pods
kubectl get services
