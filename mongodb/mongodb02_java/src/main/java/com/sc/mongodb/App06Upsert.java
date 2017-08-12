package com.sc.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.sc.mongodb.utils.MongodbUtil;

import java.util.Arrays;
import java.util.List;

// Upsert works like update or insert
public class App06Upsert {

    public static void main(String[] args) {
        MongodbUtil.connect();

        DBCollection collection = MongodbUtil.getCollection("mydb", "collection");
        collection.drop();

        List<String> dataList = Arrays.asList("name1", "name2", "name3");
        for (String name : dataList) {
            collection.insert(new BasicDBObject("_id", name));
        }

        BasicDBObject modifiedObject = new BasicDBObject("$set", new BasicDBObject("age", 20));

        // This command will look for the object where _id=name500. It will not find any object so it
        // will not update any records.
        collection.update(new BasicDBObject("_id", "name500"), modifiedObject, false, false);

        // if we turn on upsert then; This command will look for the object where _id=name500.
        // It will not find any object so it will insert a new record.
        collection.update(new BasicDBObject("_id", "name500"), modifiedObject, true, false);




        MongodbUtil.printCollection(collection);

        MongodbUtil.disconnect();
    }
}
