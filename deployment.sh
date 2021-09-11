#!/bin/bash
kubectl delete ns demo

kubectl create ns demo
kubectl label namespace/demo istio-injection=enabled

kubectl -n demo apply -f k8s/deployment/gateway
kubectl -n demo apply -f k8s/deployment/ingredient
kubectl -n demo apply -f k8s/deployment/recipe
kubectl -n demo apply -f k8s/deployment/ui
kubectl -n demo get all

