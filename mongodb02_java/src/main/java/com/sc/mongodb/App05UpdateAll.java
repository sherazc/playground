package com.sc.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.sc.mongodb.utils.MongodbUtil;

import java.util.Arrays;
import java.util.List;

public class App05UpdateAll {

    public static void main(String[] args) {
        MongodbUtil.connect();

        DBCollection collection = MongodbUtil.getCollection("mydb", "collection");
        collection.drop();

        List<String> dataList = Arrays.asList("name1", "name2", "name3");
        for (String name : dataList) {
            collection.insert(new BasicDBObject("_id", name));
        }

        // We query for all records "new BasicDBObject()" but still this command will update only
        // the first record because this is mongodb's default behaviour
        BasicDBObject modifiedObject = new BasicDBObject("age", 20);
        collection.update(new BasicDBObject(), modifiedObject);

        // To update each and and every record we have to use these commands\
        modifiedObject = new BasicDBObject();

        // To update multiple records we have to use "$set"
        // Instead of using append we can also use put because BasicDBObject is a java.util.Map
        modifiedObject.put("$set", new BasicDBObject("age", 20));

        System.out.println("ModifiedObject = " + modifiedObject);
        collection.update(new BasicDBObject(), modifiedObject, false,
                // This boolean tell to update multiple
                true);

        MongodbUtil.printCollection(collection);

        MongodbUtil.disconnect();
    }
}
