#!/usr/bin/env bash


aws sts get-caller-identity



aws eks update-kubeconfig --region us-east-1 --name k8s02_sb_cluster

kubectl apply -f aws-auth-patch.yaml

kubectl get nodes