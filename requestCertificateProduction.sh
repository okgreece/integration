#!/usr/bin/env bash
mkdir -p ./volumes/nginx/letsencrypt/www
mkdir -p ./volumes/nginx/letsencrypt/lib
mkdir -p ./volumes/nginx/letsencrypt/etc

docker run -it --rm --name letsencrypt \
    -p 1086:80 \
    -v "$PWD/volumes/nginx/letsencrypt/etc:/etc/letsencrypt" \
    -v "$PWD/volumes/nginx/letsencrypt/lib:/var/lib/letsencrypt" \
    -v "$PWD/volumes/nginx/letsencrypt/www:/var/www" \
    quay.io/letsencrypt/letsencrypt:latest \
    certonly \
    --authenticator webroot \
    --webroot \
    --webroot-path /var/www \
    --agree-tos \
    --renew-by-default \
    -d eis-openbudgets.iais.fraunhofer.de \
    -m mlukasch@gmail.com \
    --server https://acme-staging.api.letsencrypt.org/directory \

#docker kill --signal=HUP dockerconfig_nginx_1
