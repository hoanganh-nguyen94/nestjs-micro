```shell

docker tag gateway-svc:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v2
docker tag ingredient-svc:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:ingredient-svc-v2
docker tag recipe-svc:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:recipe-svc-v2

docker login registry.gitlab.com -u secret-push -p k2CgWBdeosBz9mqYzxVt

docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v2
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:ingredient-svc-v2
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:recipe-svc-v2

```

kubectl create ns demo
kubectl label namespace/demo istio-injection=enabled

kubectl -n demo apply -f k8s/deployment/gateway
kubectl -n demo apply -f k8s/deployment/ingredient
kubectl -n demo apply -f k8s/deployment/recipe

kubectl apply -f k8s/deployment/tool.yaml

kubectl  apply -f k8s/deployment/gateway
