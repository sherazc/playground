#!/bin/sh
watchman watch-del-all
rm -rf node_modules
npm install
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*
