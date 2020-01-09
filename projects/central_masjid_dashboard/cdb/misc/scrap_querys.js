// Collections
db.getCollection('company').find({});
db.getCollection('centralControl').find({});
db.getCollection('prayerConfig').find({});

db.getCollection('user').find({});
db.getCollection('hadith').find({});
db.getCollection('picklist').find({});

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
   // { $match : { companyId : ObjectId("5da2632ef2a2337a5fd916d3") } }
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
