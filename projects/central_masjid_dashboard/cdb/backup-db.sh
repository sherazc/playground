#!/usr/bin/env bash

backupDir="db-backup-$(date +"%Y-%m-%d-%H-%M")"
rm -rf "$backupDir"
mkdir "$backupDir"
cd "$backupDir"
touch file.txt
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=company  --out=./cdb/company.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=centralControl  --out=./cdb/centralControl.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=companyDataVersion  --out=./cdb/companyDataVersion.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=companyListVersion  --out=./cdb/companyListVersion.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=prayerConfig  --out=./cdb/prayerConfig.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=user  --out=./cdb/user.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=hadith  --out=./cdb/hadith.json
# mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=picklist  --out=./cdb/picklist.json

