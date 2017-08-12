package com.sc.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.sc.mongodb.utils.MongodbUtil;

import java.util.Arrays;
import java.util.List;

public class App07Update_$unset {

    public static void main(String[] args) {
        MongodbUtil.connect();

        DBCollection collection = MongodbUtil.getCollection("mydb", "collection");
        collection.drop();

        List<String> dataList = Arrays.asList("name1", "name2", "name3");
        for (String name : dataList) {
            collection.insert(new BasicDBObject("_id", name).append("age", 20));
        }

        // $unset removes a field from matched objects
        BasicDBObject modifiedObject = new BasicDBObject("$unset", new BasicDBObject("age", null));

        collection.update(new BasicDBObject("_id", "name2"), modifiedObject);

        MongodbUtil.printCollection(collection);

        MongodbUtil.disconnect();
    }
}
