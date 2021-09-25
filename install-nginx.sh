#!/bin/bash

kubectl apply -f k8s/ingress-nginx/namespace.yaml
kubectl label namespace/ingress-nginx istio-injection=enabled
kubectl apply -f k8s/ingress-nginx/
kubectl -n ingress-nginx get deploy -o yaml | istioctl kube-inject -f - | kubectl apply -f -


