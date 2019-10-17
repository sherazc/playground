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
    
