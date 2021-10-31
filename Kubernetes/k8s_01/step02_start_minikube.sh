#!/bin/bash
# https://minikube.sigs.k8s.io/docs/start/


# https://minikube.sigs.k8s.io/docs/drivers/
# minikube can be started in many different kind of VMs. But docker is prefered driver

# Clean previously created k8s cluster
minikube delete --all

# "docker" is default driver
minikube start --driver=docker
