#!/bin/bash
kubectl apply -f k8s/istio-1.10.2/samples/addons
kubectl apply -f k8s/deployment/istio-addons-ingress.yaml
