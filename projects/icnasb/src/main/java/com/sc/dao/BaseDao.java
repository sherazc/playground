package com.sc.dao;

import com.mongodb.WriteResult;
import com.sc.domain.BaseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

public abstract class BaseDao<T extends BaseEntity> {
    private static final Logger LOG = LoggerFactory.getLogger(BaseDao.class);

    @Inject
    @Named("mongoTemplate")
    private MongoTemplate mongoOperations;

    public List<T> findAll() {
        return this.mongoOperations.findAll(getEntityClass());
    }

    public void insert(T entity) {
        LOG.debug("Inserting " + entity);
        this.mongoOperations.save(entity);
    }

    public void insert(T entity, String collectionName) {
        this.mongoOperations.save(entity, collectionName);
    }

    public T findById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        return this.mongoOperations.findOne(query, getEntityClass());
    }

    public T findById(String id, String collectionName) {
        Query query = new Query(Criteria.where("_id").is(id));
        return this.mongoOperations.findOne(query, getEntityClass(), collectionName);
    }

    public void update(T entity) {
        this.mongoOperations.save(entity);
    }

    public void update(T entity, String collectionName) {
        this.mongoOperations.save(entity, collectionName);
    }

    public List<T> find(Criteria criteria) {
        if (criteria == null) {
            return null;
        }
        return this.mongoOperations.find(new Query(criteria), getEntityClass());
    }

    public List<T> find(Criteria criteria, String collectionName) {
        if (criteria == null) {
            return null;
        }
        return this.mongoOperations.find(new Query(criteria), getEntityClass(), collectionName);
    }

    public int deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        WriteResult result = this.mongoOperations.remove(query, getEntityClass());
        return result.getN();
    }

    public int deleteById(String id, String collectionName) {
        Query query = new Query(Criteria.where("_id").is(id));
        WriteResult result = this.mongoOperations.remove(query, getEntityClass(), collectionName);
        return result.getN();
    }

    protected abstract Class<T> getEntityClass();
}
