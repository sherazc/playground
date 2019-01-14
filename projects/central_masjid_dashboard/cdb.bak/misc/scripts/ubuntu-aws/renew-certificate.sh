#!/bin/bash

cd /home/ubuntu/dev/certbot/

sudo ./certbot-auto renew

cd /etc/letsencrypt/live/bitsegment.com/

echo Updating keystore.p12 with renewed certificate

openssl pkcs12 -export -in fullchain.pem \
                -inkey privkey.pem \
                -out keystore.p12 \
                -name tomcat \
                -CAfile chain.pem \
                -caname root \
                -password pass:<password>

echo Restarting cdb app
systemctl restart cdb

echo Done!
