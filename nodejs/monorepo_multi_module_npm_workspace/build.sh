#!/usr/bin/env bash

# npm install -g typescript
# npm install -g ts-node

cd masjid_lib
rm -rf dist
npm install
npm run compile
cd ..

cd masjid_ui
rm -rf dist
npm install
npm run start
cd ..

cd masjid_reactjs
rm -rf build
npm install
npm run build
cd ..


