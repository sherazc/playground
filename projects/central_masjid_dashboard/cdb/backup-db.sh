#!/usr/bin/env bash

backupDir="db-backup-$(date +"%Y-%m-%d-%H-%M")"
# rm -rf "$backupDir"
mkdir "$backupDir"

cd "$backupDir"

mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=company  --out=company.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=centralControl  --out=centralControl.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=companyDataVersion  --out=companyDataVersion.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=companyListVersion  --out=companyListVersion.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=prayerConfig  --out=prayerConfig.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=user  --out=user.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=hadith  --out=hadith.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=picklist  --out=picklist.json

# shellcheck disable=SC2103
cd ..
tar -cvzf "$backupDir.tar.gz" "$backupDir"

rm -rf "$backupDir"
