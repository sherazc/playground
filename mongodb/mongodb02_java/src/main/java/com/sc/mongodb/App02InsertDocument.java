package com.sc.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

import java.net.UnknownHostException;
import java.util.Date;

public class App02InsertDocument {
    public static void main(String[] args) throws UnknownHostException {
        MongoClient mongoClient = new MongoClient();
        DB mydb = mongoClient.getDB("mydb");

        DBCollection itemDbCollection = mydb.getCollection("item");

        itemDbCollection.drop();

        for (int i = 1; i <= 10; i++) {

            int itemNum = 100 * i;

            // String
            BasicDBObject basicDBObject = new BasicDBObject("name", "Item " + itemNum);
            // int
            basicDBObject.append("itemNum", itemNum);
            // Date
            basicDBObject.append("expirationDate", new Date());

            // Double
            basicDBObject.append("price", (double) itemNum + i);

            // Array
            basicDBObject.append("classification", new String[]{"Electronics", "Phones", "Computers"});

            BasicDBObject basicDBObjectCategory = new BasicDBObject("c1key", "c1value");
            basicDBObjectCategory.append("c2key", "c2value");

            // Object - adding BasicDBObject to another BasicDBObject
            basicDBObject.append("category", basicDBObjectCategory);

            itemDbCollection.insert(basicDBObject);
        }

        System.out.println("Item collection count = " + itemDbCollection.getCount());
    }
}
