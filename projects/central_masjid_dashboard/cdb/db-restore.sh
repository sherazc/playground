#!/usr/bin/env bash
# scp -i /Users/sheraz/.ssh/id_rsa -r \
#     ubuntu@3.215.75.115:/home/ubuntu/cdb/data_export/db-backup-2023-02-17-03-49.tar.gz \
#     misc/data_export/db-backup-2023-02-17-03-49.tar.gz

# To restore data in local data container
#
# Copy below files in the container
# docker cp db-backup-2023-02-17-03-49.tar.gz cdbdb:/
# docker cp db-restore.sh cdbdb:/
#
# After copying run this script inside the container
#


backupDir="db-backup-2023-02-17-03-49"
backupFile="$backupDir.tar.gz"
tar -zxvf "$backupFile"
cd "$backupDir"

mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=company  --file=company.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=centralControl  --file=centralControl.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=companyDataVersion  --file=companyDataVersion.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=companyListVersion  --file=companyListVersion.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=prayerConfig  --file=prayerConfig.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=user  --file=user.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=hadith  --file=hadith.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=picklist  --file=picklist.json


cd ..

rm -rf "$backupDir"
