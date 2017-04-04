package com.sc.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.sc.mongodb.utils.MongodbUtil;

import java.util.Arrays;
import java.util.List;

public class App07Remove {

    public static void main(String[] args) {
        MongodbUtil.connect();

        DBCollection collection = MongodbUtil.getCollection("mydb", "collection");
        collection.drop();

        List<String> dataList = Arrays.asList("name1", "name2", "name3");
        for (String name : dataList) {
            collection.insert(new BasicDBObject("_id", name));
        }

        // Unlike update, by default remove removes all objects that matches the criteria. Update only updates first
        // record unless we add "$set" operator and set "multi" to true.
        // collection.remove(new BasicDBObject());

        collection.remove(new BasicDBObject("_id", "name2"));

        MongodbUtil.printCollection(collection);

        MongodbUtil.disconnect();
    }
}
