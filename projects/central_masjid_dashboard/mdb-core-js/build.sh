#!/usr/bin/env bash
start=`date +%s`


npm install
rm -rf ./dist
npm run build
npm run test
end=`date +%s`
echo "Build finish! $(date +%c). Time taken = $((end-start)) seconds."
