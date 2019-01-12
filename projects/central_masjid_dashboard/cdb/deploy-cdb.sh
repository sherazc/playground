#!/bin/bash
./clean.sh
./build.sh

scp -i /Users/sheraz/.ssh/id_rsa -r \
    ./api/webservices/target/cdb.jar \
    ubuntu@54.165.184.232:/home/ubuntu/cdb/app

echo ====[ Successfully cleaned, built and deployed on EC2. ]====
echo ====[ Now Restart application on AWS. ]====
