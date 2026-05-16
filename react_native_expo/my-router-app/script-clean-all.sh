#!/bin/bash

# This script will refresh the project caches and libraries

rm -rf ~/Library/Developer/Xcode/DerivedData/myrouterapp-*
rm -rf ios
rm -rf android
rm -rf .expo
rm -rf node_modules package-lock.json

# npm install
