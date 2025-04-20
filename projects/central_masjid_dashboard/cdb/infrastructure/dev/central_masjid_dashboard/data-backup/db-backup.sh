#!/usr/bin/env bash

# You will find db-backup.sh and db-restore.sh script in prod servers in this folder:
# /opt/central_masjid_dashboard/data-backup/

backupDir="db-backup-$(date +"%Y-%m-%d-%H-%M")"
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

cd ..
tar -cvzf "$backupDir.tar.gz" "$backupDir"

rm -rf "$backupDir"

# To restore the created archive look at db-restore.sh