package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.cc.CentralControl;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CentralControlDao {

    private MongoTemplate mongoTemplate;

    public CentralControlDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void save(CentralControl centralControl) {
        mongoTemplate.save(centralControl);
    }

    public void dropCollection() {
        mongoTemplate.dropCollection(CentralControl.class);
    }

    // TODO remove below method this is just for testing updating complex object
    // https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify
    // https://stackoverflow.com/questions/47699646/updating-replacing-a-deeply-nested-object-in-mongodb-with-spring-data-mongodb
    public void updateComplexObject() {
        // Query reference
        // https://www.baeldung.com/queries-in-spring-data-mongodb
        Query query = new Query(Criteria.where("companyId").is("company1"));
        Update update = new Update().set("jummahs.0.khateeb", "Kateeb 1 Changed again");
        mongoTemplate.updateMulti(query, update, CentralControl.class);
        List<CentralControl> centralControls = mongoTemplate.find(new Query(Criteria.where("companyId").is("company1")), CentralControl.class);
        System.out.println(centralControls);

        List<CentralControl> centralControls1 = mongoTemplate.findAll(CentralControl.class);
        centralControls1.forEach(System.out::println);
    }
}
