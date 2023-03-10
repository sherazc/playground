#!/bin/bash

# Vars
baseDir=$PWD
dataDir=$baseDir/misc/mongo-data

# Clean up
rm -rf $dataDir
mkdir $dataDir
docker rm -f cdbdb

# Create container
docker run -it \
    -p 27017:27017 \
    --name cdbdb \
    -v $dataDir:/data/db \
    -d mongo
