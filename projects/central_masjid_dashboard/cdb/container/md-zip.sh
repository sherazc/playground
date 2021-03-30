#!/bin/bash
rm -rf target
mkdir target
rm -rf ./masjid-dashboard/app/cdb.jar
cp ../api/webservices/target/cdb.jar ./masjid-dashboard/app
tar -czvf ./target/masjid-dashbaord.tar.gz masjid-dashboard
