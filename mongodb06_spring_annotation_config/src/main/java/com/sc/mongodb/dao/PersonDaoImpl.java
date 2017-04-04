package com.sc.mongodb.dao;

import com.mongodb.WriteResult;
import com.sc.mongodb.domain.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

@Component("personDao")
public class PersonDaoImpl implements PersonDao {

    public static final String PERSON_COLLECTION = "person";
    private MongoOperations mongoOperations;

    public PersonDaoImpl() {
    }

    @Autowired
    public PersonDaoImpl(@Qualifier("mongoTemplate") MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public void insert(Person person) {
        this.mongoOperations.insert(person, PERSON_COLLECTION);
    }

    @Override
    public Person findById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        return this.mongoOperations.findOne(query, Person.class, PERSON_COLLECTION);
    }

    @Override
    public void update(Person person) {
        this.mongoOperations.save(person, PERSON_COLLECTION);
    }

    @Override
    public int deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        WriteResult result = this.mongoOperations.remove(query, Person.class, PERSON_COLLECTION);
        return result.getN();
    }
}
