package com.sc.spring.dao;

import com.mongodb.WriteResult;
import com.sc.spring.domain.BaseEntity;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

public abstract class BaseDao<T extends BaseEntity> {

    @Inject
    @Named("mongoTemplate")
    private MongoOperations mongoOperations;

    public List<T> findAll() {
        return this.mongoOperations.findAll(getEntityClass());
    }

    public void insert(T entity) {
        this.mongoOperations.insert(entity);
    }

    public T findById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        return this.mongoOperations.findOne(query, getEntityClass());
    }

    public void update(T entity) {
        this.mongoOperations.save(entity);
    }

    public List<T> find(Criteria criteria) {
        if (criteria == null) {
            return null;
        }
        return this.mongoOperations.find(new Query(criteria), getEntityClass());
    }

    public int deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        WriteResult result = this.mongoOperations.remove(query, getEntityClass());
        return result.getN();
    }

    protected abstract Class<T> getEntityClass();
}
