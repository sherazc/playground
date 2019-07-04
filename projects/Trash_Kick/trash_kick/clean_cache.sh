#!/bin/sh

# Reset cache is making clean cache very slow.
# npm start -- --reset-cache
watchman watch-del-all
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*
rm -rf ./node_modules
rm -rf ./android/app/build
rm -rf ./android/build
rm -rf ./ios/build
rm -rf ./ios/Pods

npm install

cd ios
pod install
