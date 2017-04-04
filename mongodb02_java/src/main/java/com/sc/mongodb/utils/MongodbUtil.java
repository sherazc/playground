package com.sc.mongodb.utils;

import com.mongodb.*;

import java.util.Calendar;

public class MongodbUtil {

    public static final MongoClient mongoClient = null;

    public static final MongoClient connect() {
        MongoClient mongoClient = null;

        try {
            if (mongoClient == null) {
                mongoClient = new MongoClient("localhost", 27017);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mongoClient;
    }

    public static final void disconnect() {
        if (mongoClient != null) {
            mongoClient.close();
        }
    }

    public static final DBCollection getCollection(String dbName, String collectionName) {
        DBCollection collection = null;
        try {
            MongoClient mongoClient = connect();
            collection = mongoClient.getDB(dbName).getCollection(collectionName);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return collection;
    }

    public static void printCollection(DBCollection collection) {
        DBCursor cursor = collection.find();
        while (cursor.hasNext()) {
            System.out.println(cursor.next());
        }
    }

    public static void generateData(String dbName, long recordsCount) {
        System.out.println("Generating test data...");
        try {
            MongoClient mongoClient = connect();
            DB db = mongoClient.getDB(dbName);

            insertEmployee(db, recordsCount);
            insertPeople(db, recordsCount);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void insertPeople(DB db, long recordsCount) {

        String collectionName = "people";
        DBCollection collection = getRefreshedCollection(db, collectionName);

        for (int i = 0; i < recordsCount; i++) {
            int num = 100 * i;
            BasicDBObject basicDBObject = new BasicDBObject("firstName", "FirstName" + num);
            basicDBObject.append("lastName", "LastName" + num);
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, 1990);
            calendar.add(Calendar.DATE, i);
            basicDBObject.append("dateOfBirth", calendar.getTime());
            collection.insert(basicDBObject);
        }

    }

    private static void insertEmployee(DB db, long recordsCount) {
        String collectionName = "employee";
        DBCollection collection = getRefreshedCollection(db, collectionName);

        for (int i = 0; i < recordsCount; i++) {
            int num = 100 * i;
            BasicDBObject employeeDbObject = new BasicDBObject("firstName", "FirstName" + num);
            employeeDbObject.append("lastName", "LastName" + num);
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, 2005);
            calendar.add(Calendar.DATE, i);
            employeeDbObject.append("hireDate", calendar.getTime());
            employeeDbObject.append("salary", new Double((100) + num));

            BasicDBObject departmentDbObject = new BasicDBObject("departmentName", "Dept " + num);
            departmentDbObject.append("location", "Dept location " + num);
            employeeDbObject.append("department",  departmentDbObject);

            collection.insert(employeeDbObject);
        }
    }

    private static DBCollection getRefreshedCollection(DB db, String collectionName) {
        DBCollection collection = db.getCollection(collectionName);
        collection.drop();
        return collection;
    }
}
