#!/bin/bash
./clean.sh
./build.sh

scp -i /Users/sheraz/.ssh/id_rsa -r \
    ./api/webservices/target/cdb.jar \
    ubuntu@ec2-54-165-184-232.compute-1.amazonaws.com:/home/ubuntu/cdb/app
