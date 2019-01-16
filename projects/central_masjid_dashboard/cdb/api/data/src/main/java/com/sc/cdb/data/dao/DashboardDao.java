package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.dashboard.Dashboard;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DashboardDao {

    private MongoTemplate mongoTemplate;

    public DashboardDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void save(Dashboard dashboard) {
        mongoTemplate.save(dashboard);
    }

    public void dropCollection() {
        mongoTemplate.dropCollection(Dashboard.class);
    }
}
