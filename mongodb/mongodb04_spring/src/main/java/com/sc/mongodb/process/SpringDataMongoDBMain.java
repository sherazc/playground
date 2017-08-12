package com.sc.mongodb.process;

import com.mongodb.MongoClient;
import com.sc.mongodb.domain.Person;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class SpringDataMongoDBMain {

    public static final String DB_NAME = "mydb";
    public static final String PERSON_COLLECTION = "person";
    public static final String MONGO_HOST = "localhost";
    public static final int MONGO_PORT = 27017;

    public static void main(String[] args) throws Exception {

        MongoClient mongoClient = new MongoClient(MONGO_HOST, MONGO_PORT);
        MongoOperations mongoOperations = new MongoTemplate(mongoClient, DB_NAME);

        mongoOperations.dropCollection(PERSON_COLLECTION);

        Person personInsert = new Person("1", "person 1", "address 1");
        mongoOperations.insert(personInsert, PERSON_COLLECTION);


        Query query = new Query(Criteria.where("name").is("person 1"));
        Person personFind = mongoOperations.findOne(query, Person.class, PERSON_COLLECTION);

        System.out.println("PersonFind = " + personFind);

        mongoClient.close();
        System.out.println("Done...");

    }
}
