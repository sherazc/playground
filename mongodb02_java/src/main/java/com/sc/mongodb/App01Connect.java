package com.sc.mongodb;

import com.mongodb.DB;
import com.mongodb.MongoClient;

import java.util.Set;

public class App01Connect {

    public static void main(String[] args) throws Exception {

        MongoClient mongoClient = new MongoClient("localhost", 27017);

        DB db = mongoClient.getDB("mydb");
        Set<String> collectionNames = db.getCollectionNames();

        for (String collectionName : collectionNames) {
            System.out.println(collectionName);
        }
    }
}
