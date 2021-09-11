#!/bin/bash
kind delete cluster --name istio
kind create cluster --name istio --config k8s/kind/kind-config.yaml

istioctl install --set profile=default -y
kubectl label namespace default istio-injection=enabled

kubectl apply -f k8s/ingress-nginx/namespace.yaml
kubectl label namespace/ingress-nginx istio-injection=enabled
kubectl apply -f k8s/ingress-nginx/

bash deployment.sh

bash istio-addons.sh



#kubectl -n ingress-nginx port-forward deploy/nginx-ingress-controller 80
#kubectl -n demo get deploy -o yaml | istioctl kube-inject -f - | kubectl apply -f -

#minikube start --nodes=3 --kubernetes-version=v1.20.7 --network-plugin=cni --cni=calico
#While ($true) { curl -UseBasicParsing http://simple.ui/api/client/; Start-Sleep -Seconds 1;}
#While ($true) { curl -UseBasicParsing http://simple.ui/api/client/ingredient; Start-Sleep -Seconds 1;}
