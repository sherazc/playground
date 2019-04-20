#!/usr/bin/env bash

# Install/Update npm and yarn
npm install npm -g
npm install yarn -g


# Build ROD Widget
cd rod-widget
yarn install
yarn build


# Build UI
cd ../ui
rm -rf build
yarn install
yarn build

# Clean static files
cd ..
rm -rf api/webservices/src/main/resources/static
mkdir -p api/webservices/src/main/resources/static

# Copy static files
cp -r ui/build/* api/webservices/src/main/resources/static

# Building API + UI jar
cd api
mvn clean install

# Do below only if spring-boot-maven-plugin's is <executable>true</executable>
# chmod +x webservices/target/cdb.jar
