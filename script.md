```shell

docker tag gateway-svc:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v2
docker tag ingredient-svc:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:ingredient-svc-v2
docker tag recipe-svc:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:recipe-svc-v2

docker tag ui-management-v1:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:ui-management-v1
docker tag ui-management-v2:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:ui-management-v2
docker tag simple-app:latest registry.gitlab.com/hoanganhnguyen1994/ui-management:simple-app


docker login registry.gitlab.com -u secret-push -p k2CgWBdeosBz9mqYzxVt

docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v1
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v2
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:ingredient-svc-v2
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:recipe-svc-v2
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:ui-management-v1
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:ui-management-v2
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:simple-app


docker build -t registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v2 -f Dockerfile.gateway-svc-v2 .
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v2

docker build -t registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v1 -f Dockerfile.gateway-svc .
docker push registry.gitlab.com/hoanganhnguyen1994/ui-management:gateway-svc-v1


```

kubectl create ns demo
kubectl label namespace/demo istio-injection=enabled

kubectl -n demo apply -f k8s/deployment/gateway
kubectl -n demo apply -f k8s/deployment/ingredient
kubectl -n demo apply -f k8s/deployment/recipe

kubectl apply -f k8s/deployment/tool.yaml

kubectl -n demo delete -f k8s/deployment/gateway
