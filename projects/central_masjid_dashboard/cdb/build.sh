#!/usr/bin/env bash
export NODE_OPTIONS=--openssl-legacy-provider

# MDB Core JS
cd ../mdb-core-js/
./build.sh
cd ../cdb/

# Install/Update npm and yarn
npm install npm -g

# Install UI dependencies
cd ./ui
rm -rf build
npm install
cd ..

# Build calendar-widget
cd ./widgets/calendar-widget
npm install
npm run build
cd ..

# Build rod-widget
cd ./rod-widget
npm install
npm run build
cd ..

# Build prayer-time-widget
cd ./prayer-time-widget
npm install
npm run build
cd ..

# Build dashboard-widget
cd ./dashboard-widget
npm install
npm run build
cd ..

# Build jummah-schedule-widget
cd ./jummah-schedule-widget
npm install
npm run build
cd ..

# Build UI
cd ../ui
# UI is already been cleaned up
npm run build

# Clean static files
cd ..
rm -rf api/webservices/src/main/resources/static
mkdir -p api/webservices/src/main/resources/static

# Copy static files
cp -r ui/build/* api/webservices/src/main/resources/static

# Building API + UI jar
cd api
./mvnw clean install

# Do below only if spring-boot-maven-plugin's is <executable>true</executable>
# chmod +x webservices/target/cdb.jar
