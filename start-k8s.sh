#!/bin/bash
kind delete cluster --name istio
kind create cluster --name istio --config k8s/kind/kind-config.yaml

bash install-istio.sh
bash install-istio-addons.sh
bash install-nginx.sh
bash deployment.sh
bash start-nginx.sh


#While ($true) { curl -UseBasicParsing http://simple.ui/api/client/; Start-Sleep -Seconds 1;}
#While ($true) { curl -UseBasicParsing http://simple.ui/api/client/; Start-Sleep -Seconds 1;}
#While ($true) { curl -UseBasicParsing http://simple.ui/api/ingredient; Start-Sleep -Seconds 1;}



