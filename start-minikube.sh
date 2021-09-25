#!/bin/bash

minikube start --nodes=3 --kubernetes-version=v1.20.7 --network-plugin=cni --cni=calico  --driver=virtualbox
minikube addons enable ingress

bash install-istio.sh
#bash install-istio-addons.sh


kubectl create ns sample
kubectl -n sample create deployment hello-minikube1 --image=nginx
kubectl -n sample expose deployment hello-minikube1 --type=LoadBalancer --port=80
kubectl -n sample rollout status deploy hello-minikube1

kubectl -n sample create deployment hello-minikube2 --image=httpd
kubectl -n sample expose deployment hello-minikube2 --type=LoadBalancer --port=8080
kubectl -n sample rollout status deploy hello-minikube2
kubectl -n sample get all

kubectl -n sample apply -f samples/bookinfo/platform/kube/bookinfo.yaml
