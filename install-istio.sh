#!/bin/bash

istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled

kubectl -n sample apply -f samples/bookinfo/platform/kube/bookinfo.yaml
