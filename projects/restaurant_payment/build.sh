#!/usr/bin/env bash
echo "==============="
echo "==== BUILD ===="
echo "==============="


# Build rp-server
cd rp-server
./mvnw clean install
docker build . -t rp-image
cd ..


date
## Install/Update npm and yarn
#npm install npm -g
#npm install yarn -g
#
## Install UI dependencies
#cd ui
#rm -rf build
#yarn install
#
## Build rod-widget
#cd ../widgets/rod-widget
#yarn install
#yarn build
#
## Build prayer-time-widget
#cd ../prayer-time-widget
#yarn install
#yarn build
#
## Build dashboard-widget
#cd ../dashboard-widget
#yarn install
#yarn build
#
## Build jummah-schedule-widget
#cd ../jummah-schedule-widget
#yarn install
#yarn build
#
## Build UI
#cd ../../ui
## UI is already been cleaned up
#yarn build
#
## Clean static files
#cd ..
#rm -rf api/webservices/src/main/resources/static
#mkdir -p api/webservices/src/main/resources/static
#
## Copy static files
#cp -r ui/build/* api/webservices/src/main/resources/static
#
## Building API + UI jar
#cd api
#./mvnw clean install
#
## Do below only if spring-boot-maven-plugin's is <executable>true</executable>
## chmod +x webservices/target/cdb.jar
