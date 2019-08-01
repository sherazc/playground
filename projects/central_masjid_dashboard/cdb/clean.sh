#!/usr/bin/env bash
rm ui/yarn.lock
rm ui/package-lock.json
rm ui/yarn-error.log
rm -rf api/webservices/src/main/resources/static
rm -rf ui/build
rm -rf ui/node_modules
cd api
mvn clean
cd ..
