package com.sc.cdb.data.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public abstract class BaseDaoImpl<T> implements BaseDao<T> {

    private MongoTemplate mongoTemplate;

    @Override
    public T save(T collection) {
        return this.mongoTemplate.save(collection);
    }

    @Override
    public T findById(String id) {
        this.mongoTemplate.findById(id, getType());
        return null;
    }

    protected MongoTemplate getMongoTemplate() {
        return mongoTemplate;
    }

    @Autowired
    protected void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    abstract Class getType();
}
