#!/bin/bash
kubectl delete ns demo

kubectl create ns demo
kubectl label namespace/demo istio-injection=enabled

kubectl -n demo apply -f k8s/deployment/gateway
kubectl -n demo apply -f k8s/deployment/ingredient
kubectl -n demo apply -f k8s/deployment/recipe
kubectl -n demo apply -f k8s/deployment/ui


#kubectl -n demo apply -f k8s/deployment/gateway/canary
#kubectl -n demo apply -f k8s/deployment/ui/canary

#kubectl apply -n demo -f k8s/servicemesh/applications/playlists-api/
#kubectl apply -n demo -f k8s/servicemesh/applications/playlists-db/
#kubectl apply -n demo -f k8s/servicemesh/applications/videos-api/
#kubectl apply -n demo -f k8s/servicemesh/applications/videos-web/
#kubectl apply -n demo -f k8s/servicemesh/applications/videos-db/
#kubectl apply -n demo -f k8s/servicemesh/istio/traffic-splits

kubectl -n demo get deploy -o yaml | istioctl kube-inject -f - | kubectl apply -f -
kubectl -n demo get all


#While ($true) { curl -UseBasicParsing http://simple.api/; Start-Sleep -Seconds 1;}
#While ($true) { curl -UseBasicParsing http://simple.ui/api/client/; Start-Sleep -Seconds 1;}
#While ($true) { curl -UseBasicParsing http://simple.ui/api/ingredient; Start-Sleep -Seconds 1;}
