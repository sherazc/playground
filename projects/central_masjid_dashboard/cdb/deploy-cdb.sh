#!/bin/bash
./clean.sh
./build.sh

scp -i /Users/sheraz/.ssh/id_rsa -r \
    ./api/webservices/target/cdb.jar \
    ubuntu@3.215.75.115:/home/ubuntu/dev

echo ====[ Successfully cleaned, built and deployed on EC2. ]====
echo ====[ Now Restart application on AWS. ]====
