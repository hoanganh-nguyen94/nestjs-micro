# UiManagementSpace

```shell

docker tag gateway-svc:latest hoanganhnguyen1994/ui-management:gateway-svc-v1
docker tag ingredient-svc:latest hoanganhnguyen1994/ui-management:ingredient-svc-v1
docker tag recipe-svc:latest hoanganhnguyen1994/ui-management:recipe-svc-v1

docker push hoanganhnguyen1994/ui-management:gateway-svc-v1
docker push hoanganhnguyen1994/ui-management:recipe-svc-v1
docker push hoanganhnguyen1994/ui-management:ingredient-svc-v1

```



```shell
minikube start --nodes 2 --kubernetes-version=v1.20.7 --driver kvm2 --kvm-gpu
#or
kind create cluster --name istio --config k8s/kind/kind-config.yaml

istioctl install --set profile=default -y
kubectl label namespace default istio-injection=enabled

kubectl apply -f k8s/ingress-nginx/namespace.yaml
kubectl label namespace/ingress-nginx istio-injection=enabled
kubectl apply -f k8s/ingress-nginx/

kubectl -n ingress-nginx port-forward deploy/nginx-ingress-controller 80


```

### [Setup dashboard](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)
```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.1.0/aio/deploy/recommended.yaml
kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default
token=$(kubectl get secrets -o jsonpath="{.items[?(@.metadata.annotations['kubernetes\.io/service-account\.name']=='default')].data.token}"|base64 --decode)
echo $token > token.txt
kubectl proxy
```

### Deploy
```shell

kubectl apply -f k8s/deployment/gateway
kubectl apply -f k8s/deployment/ingredient
kubectl apply -f k8s/deployment/recipe

```
