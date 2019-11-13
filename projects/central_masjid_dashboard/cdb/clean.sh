#!/usr/bin/env bash

# Clean Logs
rm rf misc/logs/*.log
rm -rf misc/logs/archived
mkdir misc/logs/archived

# Clean UI
rm ui/yarn.lock
rm ui/package-lock.json
rm ui/yarn-error.log
rm -rf ui/build
rm -rf ui/node_modules

# Clean rod-widget
rm -rf widgets/rod-widget/yarn.lock
rm -rf widgets/rod-widget/package-lock.json
rm -rf widgets/rod-widget/yarn-error.log
rm -rf widgets/rod-widget/node_modules

# Clean prayer-time-widget
rm -rf widgets/prayer-time-widget/yarn.lock
rm -rf widgets/prayer-time-widget/package-lock.json
rm -rf widgets/prayer-time-widget/yarn-error.log
rm -rf widgets/prayer-time-widget/node_modules


# Clean API
rm -rf api/webservices/src/main/resources/static
cd api
mvn clean
cd ..
