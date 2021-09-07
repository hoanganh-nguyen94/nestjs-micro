#!/bin/bash
kind delete cluster --name istio
kind create cluster --name istio --config k8s/kind/kind-config.yaml

istioctl install --set profile=default -y
kubectl label namespace default istio-injection=enabled

kubectl apply -f k8s/ingress-nginx/namespace.yaml
kubectl label namespace/ingress-nginx istio-injection=enabled
kubectl apply -f k8s/ingress-nginx/

kubectl create ns demo
kubectl label namespace/demo istio-injection=enabled

kubectl -n demo apply -f k8s/deployment/gateway
kubectl -n demo apply -f k8s/deployment/gateway/canary
kubectl -n demo apply -f k8s/deployment/ingredient
kubectl -n demo apply -f k8s/deployment/recipe
kubectl -n demo apply -f k8s/deployment/ui
kubectl -n demo apply -f k8s/deployment/ui/canary
kubectl -n demo get all

kubectl -n ingress-nginx port-forward deploy/nginx-ingress-controller 80
