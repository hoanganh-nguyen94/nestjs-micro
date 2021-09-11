FROM registry.gitlab.com/hcg-openhub/hcg-hub/hcg-nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/app_engine

RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health

ADD dist/ui-management/ /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/envconfig.template.js > /usr/share/nginx/html/assets/envconfig.js && exec nginx -g 'daemon off;'"]
