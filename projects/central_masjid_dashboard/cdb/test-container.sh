#!/bin/bash
cd test-container

rm -rf app
mkdir app
cp ../misc/data_export/db-backup-2023-02-17-03-49.tar.gz ./app
cp ../api/webservices/target/cdb.jar ./app
cp -r ../../../../../deployment_scripts/cdb/* ./app
cp ../db-restore.sh ./app
cp ../db-backup.sh ./app


docker stop cdb
docker rm cdb
docker rmi cdb_image
docker build . -t cdb_image

docker run -it \
    -p 27000:27017 \
    -p 8005:8085 \
    -p 8000:80 \
    --name cdb \
    -d cdb_image

cd ..
