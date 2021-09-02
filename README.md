# UiManagementSpace

### Script build image

```shell
docker compose -f docker-compose.build.yaml build

docker push hoanganhnguyen1994/ui-management:gateway-svc-v1
docker push hoanganhnguyen1994/ui-management:gateway-svc-v2
docker push hoanganhnguyen1994/ui-management:ingredient-svc-v1
docker push hoanganhnguyen1994/ui-management:recipe-svc-v1


docker push hoanganhnguyen1994/ui-management:tagname

```
docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management
docker run -d -p 3000:3000 --env INGREDIENT_SVC_PORT=3000 --env INGREDIENT_SVC_HOST=servicemesh.demo ahihi:latest 
docker run -d -p 3000:3000 --env INGREDIENT_SVC_PORT=3000  ahihi 

docker  build -t ahihi -f Dockerfile.ingredient-svc .
