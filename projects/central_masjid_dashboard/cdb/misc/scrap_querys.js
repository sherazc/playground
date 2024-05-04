// use cdb

/*

db.getCollection('company').drop();
db.getCollection('centralControl').drop();
db.getCollection('prayerConfig').drop();
db.getCollection('user').drop();
db.getCollection('companyListVersion').drop();
db.getCollection('companyDataVersion').drop();
db.getCollection('hadith').drop();
db.getCollection('picklist').drop();
*/

// Collections
db.getCollection('company').find({});
db.getCollection('centralControl').find({});
db.getCollection('prayerConfig').find({});
db.getCollection('user').find({});
db.getCollection('hadith').find({});
db.getCollection('picklist').find({});
db.getCollection('companyListVersion').find({});
db.getCollection('companyDataVersion').find({});



// Join Company with Users
// AKA Find all company users
db.getCollection('company').aggregate([
    {
      $lookup:
         {
            from: "user",
            localField: "_id",
            foreignField: "companyId",
            as: "users"
        }
   },
   { $match : { "_id" : ObjectId("601178cedc813a7769981d34") } }
]);



// Join User and Companies
db.getCollection('user').aggregate([
    {
      $lookup:
         {
            from: "company",
            localField: "companyId",
            foreignField: "_id",
            as: "company"
        }
   },
   { $match : { "companyId" : ObjectId("601178cedc813a7769981d34") } }
]);


// Join centralControl and Company
db.getCollection('centralControl').aggregate([
    {
      $lookup:
         {
            from: "company",
            localField: "companyId",
            foreignField: "_id",
            as: "company"
        }
   },
   { $match : { "company.url" : "inttest" } }
]);

// Used in PicklistDao.getAllConfiguration()
db.getCollection('picklist').aggregate([
    {$unwind : "$configurations"},
    {$project : {
            _id: 0,
            name : "$configurations.name",
            type : "$configurations.type",
            label : "$configurations.label",
            defaultValue : "$configurations.defaultValue",
            description : "$configurations.description"
        }
    }
]);


// HOD Pagination. Used in getting next Random hadees
db.getCollection('hadith').find({}).skip(74).limit(1);

// Reset Email varification
db.getCollection('user').find({"email": "stariqch@yahoo.com"});

db.user.update(
{"email": "stariqch@yahoo.com"},
{$set: {"active": false, "verified" : false, "emailVerifyCode": "abc"}},
{multi: true});

// Registration reset. Delete by email address
db.user.find({email: "stariqch@yahoo.com"}).map(u => {
    db.getCollection('company').remove({companyId: u.companyId});
    db.getCollection('centralControl').remove({companyId: u.companyId});
    db.getCollection('prayerConfig').remove({companyId: u.companyId});
    return "Deleted";
});

db.user.remove({email: "stariqch@yahoo.com"});


// Reset Prayer config
db.prayerConfig.remove({"companyId" : ObjectId("5da2632ef2a2337a5fd916d3")});
db.prayerConfig.insert({
    "companyId" : ObjectId("5da2632ef2a2337a5fd916d3"),
    "location" : "",
    "calculationMethod" : 0,
    "asrJuristicMethod" : 0,
    "prayerOffsetMinutes" : [],
    "geoCode" : {},
    "dst" : {},
    "prayers" : [],
    "_class" : "com.sc.cdb.data.model.prayer.PrayerConfig"
});
db.prayerConfig.find({"companyId" : ObjectId("5da2632ef2a2337a5fd916d3")});


// Find Valid prayerConfigs. prayerConfigs that has values in prayers array
// This query did not work.
db.getCollection('company').aggregate([
   {$match : { "active" : true}},
    {
      $lookup:
         {
            from: "prayerConfig",
            localField: "_id",
            foreignField: "companyId",
            as: "prayerConfig"
        }
   },
   { $match : { "prayerConfig.prayers" : { $exists: true} } },
//    {$match: {$expr:{$gt:[{$size:"prayerConfig.prayers"}, 1]}}},
//    {$where: "this.prayers.length > 1" },
//    {$project : { "name" : 1, "url": 1 } }
]);

db.getCollection("prayerConfig").find({ $where: "this.prayers.length > 1" });

db.getCollection("prayerConfig").find({'prayers.365': {$exists: true}});

// Join Company and user
db.getCollection('company').aggregate([
    {
      $lookup:
         {
            from: "user",
            localField: "_id",
            foreignField: "companyId",
            as: "user"
        }
   },
   { $match : { "user.email" : "stariqch@gmail.com" } }
]);


var companyId = "5da2632ef2a2337a5fd916d3";

db.getCollection("company").find({"_id": ObjectId(companyId)});
db.getCollection('centralControl').find({"companyId": ObjectId(companyId)});
db.getCollection('prayerConfig').find({"companyId": ObjectId(companyId)});
db.getCollection('user').find({"companyId": ObjectId(companyId)});


// Find centralControl.customConfiguration by companyId and centralControl.customConfiguration.name
companyId = "5da2632ef2a2337a5fd916d3";
configName = "hijri_adjust_days";

db.getCollection('centralControl').aggregate([
   { $match : {"companyId": ObjectId(companyId)} },
   { $unwind : "$customConfigurations"},
   { $project : {
            _id: 0,
            companyId: 1,
            name : "$customConfigurations.name",
            value : "$customConfigurations.value",
        }
    },
    { $match : {"name" : configName} },
]);


// update customCustomConfiguration value
// by below companyId and configName
companyId = "5da2632ef2a2337a5fd916d3";
configName = "hijri_adjust_days";
configValue = 0;

db.getCollection('centralControl').update(
    {
        "companyId": ObjectId(companyId),
        "customConfigurations.name" : configName
    },
    {$set:{
        "customConfigurations.$.value" : configValue
    }}
);


// Start - delete company and its references documents

var deleteCompanyUrl = "a";

db.getCollection('company')
.find({"url": deleteCompanyUrl})
.map(c => {
    // Delete Users
    db.getCollection('user').find({"companyId": c._id}).map(u => {
        db.getCollection('user').remove({"_id": u._id});
    });

    // Delete centralControl
    db.getCollection('centralControl').find({"companyId": c._id}).map(cc => {
        db.getCollection('centralControl').remove({"_id": cc._id});
    });

    // Delete companyDataVersion
    db.getCollection('companyDataVersion').find({"companyId": c._id}).map(cdv => {
        db.getCollection('companyDataVersion').remove({"_id": cdv._id});
    });

    // Delete prayerConfig
    db.getCollection('prayerConfig').find({"companyId": c._id}).map(pc => {
        db.getCollection('prayerConfig').remove({"_id": pc._id});
    });

    return c;
});


db.getCollection('company').remove({"url": deleteCompanyUrl});

// End

/*

Export Data
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=company  --out=./cdb/company.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=centralControl  --out=./cdb/centralControl.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=companyDataVersion  --out=./cdb/companyDataVersion.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=companyListVersion  --out=./cdb/companyListVersion.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=prayerConfig  --out=./cdb/prayerConfig.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=user  --out=./cdb/user.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=hadith  --out=./cdb/hadith.json
mongoexport --uri="mongodb://localhost:27017/cdb"  --collection=picklist  --out=./cdb/picklist.json

// Sample import
// mongoimport --db agg --collection person --jsonArray --legacy --drop --file Persons.json

tar -cvzf cdb.tar.gz cdb
rm -rf cdb

Import data
tar -zxvf cdb.tar.gz

mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=company  --file=./cdb/company.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=centralControl  --file=./cdb/centralControl.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=companyDataVersion  --file=./cdb/companyDataVersion.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=companyListVersion  --file=./cdb/companyListVersion.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=prayerConfig  --file=./cdb/prayerConfig.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=user  --file=./cdb/user.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=hadith  --file=./cdb/hadith.json
mongoimport --uri="mongodb://localhost:27017/cdb"  --collection=picklist  --file=./cdb/picklist.json

Download backup

scp -i /Users/sheraz/.ssh/id_rsa -r \
    ubuntu@3.215.75.115:/home/ubuntu/cdb/data_export/cdb_20210510_a.tar.gz \
    ./cdb/misc/data_export/cdb_20210510_a.tar.gz
*/