#!/bin/bash

cd services/service-management && npm install && npm run build:gateway && npm run build:ingredient && npm run build:recipe
