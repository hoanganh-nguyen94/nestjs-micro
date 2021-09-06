# UiManagementSpace


```shell
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

---

### [Setup kiali](http://127.0.0.1:20001)
```shell
kubectl apply -f k8s/istio-1.10.2/samples/addons
kubectl port-forward svc/kiali -n istio-system 20001
```

### Deploy
```shell

kubectl create ns demo
kubectl label namespace/demo istio-injection=enabled

kubectl -n demo apply -f k8s/deployment/gateway
kubectl -n demo apply -f k8s/deployment/gateway/canary
kubectl -n demo apply -f k8s/deployment/ingredient
kubectl -n demo apply -f k8s/deployment/recipe
kubectl -n demo apply -f k8s/deployment/ui
kubectl -n demo apply -f k8s/deployment/ui/canary
kubectl -n demo get all

```
