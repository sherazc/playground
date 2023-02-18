#!/bin/bash
rm -rf app
mkdir app
cp /Users/sheraz/dev/playground/projects/central_masjid_dashboard/cdb/misc/data_export/db-backup-2023-02-17-03-49.tar.gz ./app
cp /Users/sheraz/dev/playground/projects/central_masjid_dashboard/cdb/api/webservices/target/cdb.jar ./app


docker stop cdb
docker rm cdb
docker rmi cdb_image
docker build . -t cdb_image

docker run -it \
    -p 27000:27017 \
    -p 8800:8080 \
    -p 8000:80 \
    --name cdb \
    -d cdb_image

