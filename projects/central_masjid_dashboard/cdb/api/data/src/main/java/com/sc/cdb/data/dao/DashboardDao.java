package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.dashboard.Dashboard;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    // TODO remove below method this is just for testing updating complex object
    // https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
    // https://stackoverflow.com/questions/47699646/updating-replacing-a-deeply-nested-object-in-mongodb-with-spring-data-mongodb
    public void updateComplexObject() {
        // Query reference
        // https://www.baeldung.com/queries-in-spring-data-mongodb
        Query query = new Query(Criteria.where("companyId").is("company1"));
        Update update = new Update().set("jummahs.0.khateeb", "Kateeb 1 Changed again");
        mongoTemplate.updateMulti(query, update, Dashboard.class);
        List<Dashboard> dashboards = mongoTemplate.find(new Query(Criteria.where("companyId").is("company1")), Dashboard.class);
        System.out.println(dashboards);

        List<Dashboard> dashboards1 = mongoTemplate.findAll(Dashboard.class);
        dashboards1.forEach(System.out::println);
    }
}
