package com.sc.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.sc.mongodb.utils.MongodbUtil;

import java.util.Arrays;
import java.util.List;

public class App04Update_$set_operator {

    public static void main(String[] args) {
        MongodbUtil.connect();

        DBCollection collection = MongodbUtil.getCollection("mydb", "collection");
        collection.drop();

        List<String> dataList = Arrays.asList("name1", "name2", "name3");
        for (String name : dataList) {
            collection.insert(new BasicDBObject("_id", name));
        }

        // This command finds document that has _id=name2 and updates it with a new field age=20
        collection.update(new BasicDBObject("_id", "name2"), new BasicDBObject("age", 20));


        // If we run similar criteria update with a different field name then last commands update will be overwritten
        // collection.update(new BasicDBObject("_id", "name2"), new BasicDBObject("gender", "F"));

        // To avoid overwriting of field we need to use "$set" operator.
        // This command will not overwrite "age" field. It will add another "gender" field
        collection.update(new BasicDBObject("_id", "name2"), new BasicDBObject("$set", new BasicDBObject("gender", "F")));

        MongodbUtil.printCollection(collection);

        MongodbUtil.disconnect();
    }
}
