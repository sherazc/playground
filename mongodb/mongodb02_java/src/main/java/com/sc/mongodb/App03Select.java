package com.sc.mongodb;

import com.mongodb.*;
import com.sc.mongodb.utils.MongodbUtil;

public class App03Select {

    public static void main(String[] args) throws Exception {
        String dbName = "mydb";
        MongodbUtil.generateData(dbName, 20);

        MongoClient mongoClient = new MongoClient("localhost", 27017);
        DB db = mongoClient.getDB(dbName);

        DBCollection employeeCollection = db.getCollection("employee");

        System.out.println("DBCollection.getCount() = " + employeeCollection.getCount());
        System.out.println("DBCollection.findOne() = " + employeeCollection.findOne());

        // find all
        DBCursor dbCursor = employeeCollection.find();

        try {
            int count = 0;
            while (dbCursor.hasNext()) {
                DBObject dbObject = dbCursor.next();
                System.out.println("Employee " + ++count + ": " + dbObject);
            }
        } finally {
            dbCursor.close();
        }
        MongodbUtil.disconnect();
    }
}
