#!/bin/bash

cd services/service-management && npm install && npm run build:gateway && npm run build:ingredient && npm run build:recipe && cd -
cd ui/ui-management && npm install && npm run build && cd -
cd ui/ui-management-v2 && npm install && npm run build && cd -
docker compose -f docker-compose.build.yaml build
