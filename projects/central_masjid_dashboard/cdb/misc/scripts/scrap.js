db.getCollection('user').find({});
db.getCollection('company').find({});

db.getCollection('company').drop();
db.getCollection('user').drop();
