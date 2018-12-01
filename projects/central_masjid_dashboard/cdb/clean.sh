#!/usr/bin/env bash
rm -rf api/webservices/src/main/resources/static
rm -rf ui/node_modules
cd api
mvn clean
cd ..
