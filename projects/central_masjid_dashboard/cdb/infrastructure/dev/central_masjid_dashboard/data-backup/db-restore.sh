#!/usr/bin/env bash
# Make sure backup file is created on the server. Check db-backup.sh
#
# Step 1 Create below scp command to download backup archive. Replace file name and Paths
#
# scp -i /Users/sheraz/.ssh/id_rsa -r \
#     ubuntu@3.215.75.115:/home/ubuntu/cdb/data_export/db-backup-2023-02-17-03-49.tar.gz \
#     misc/data_export/db-backup-2023-02-17-03-49.tar.gz

# Step 2: To restore data in local docker container, copy below files in the container.
#
# docker cp db-backup-2023-02-17-03-49.tar.gz cdbdb:/
# docker cp db-restore.sh cdbdb:/
#
# Step 3: Update "backupDir", copy db-restore.sh in docker container and run db-restore.sh script inside the container.
# docker cp db-restore.sh cdbdb:/
#
# Step 4: Delete exisinting collections in
# Step 4: Bash login in cdbdb docker container and run db

backupDir="db-backup-2025-04-20-01-23"
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
