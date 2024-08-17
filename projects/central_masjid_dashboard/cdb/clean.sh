#!/usr/bin/env bash

# Clean test-container app
rm -rf test-container/app

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
rm -rf ui/public/static/rod-widget/app.min.*

# Clean prayer-time-widget
rm -rf widgets/prayer-time-widget/yarn.lock
rm -rf widgets/prayer-time-widget/package-lock.json
rm -rf widgets/prayer-time-widget/yarn-error.log
rm -rf widgets/prayer-time-widget/node_modules
rm -rf ui/public/static/prayer-time-widget/app.min.*

# Clean dashboard-widget
rm -rf widgets/dashboard-widget/yarn.lock
rm -rf widgets/dashboard-widget/package-lock.json
rm -rf widgets/dashboard-widget/yarn-error.log
rm -rf widgets/dashboard-widget/node_modules
rm -rf ui/public/static/dashboard-widget/app.min.*

# Clean jummah-schedule-widget
rm -rf widgets/jummah-schedule-widget/yarn.lock
rm -rf widgets/jummah-schedule-widget/package-lock.json
rm -rf widgets/jummah-schedule-widget/yarn-error.log
rm -rf widgets/jummah-schedule-widget/node_modules
rm -rf ui/public/static/jummah-schedule-widget/app.min.*

# Clean calendar-widget
rm -rf widgets/calendar-widget/yarn.lock
rm -rf widgets/calendar-widget/package-lock.json
rm -rf widgets/calendar-widget/yarn-error.log
rm -rf widgets/calendar-widget/node_modules
rm -rf ui/public/static/calendar-widget/app.min.*

# Clean frame-widget
rm -rf widgets/frame-widget/yarn.lock
rm -rf widgets/frame-widget/package-lock.json
rm -rf widgets/frame-widget/yarn-error.log
rm -rf widgets/frame-widget/node_modules
rm -rf ui/public/static/frame-widget/app.min.*



# Clean API
rm -rf api/webservices/src/main/resources/static
cd api
./mvnw clean
cd ..
