#!/bin/bash

kubectl -n ingress-nginx rollout status deployment nginx-ingress-controller
kubectl -n ingress-nginx port-forward deploy/nginx-ingress-controller 80

