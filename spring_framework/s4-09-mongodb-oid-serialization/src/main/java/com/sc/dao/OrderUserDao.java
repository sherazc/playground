package com.sc.dao;

import java.util.List;

import com.sc.modal.OrderUser;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.stereotype.Repository;

@Repository
public class OrderUserDao {

    private MongoTemplate mongoTemplate;

    public OrderUserDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<OrderUser> findAllOrders() {

        LookupOperation lookupOperation = LookupOperation.newLookup()
                .from("user")
                .localField("userId")
                .foreignField("_id")
                .as("user");

        Aggregation aggregation = Aggregation.newAggregation(lookupOperation);

        return mongoTemplate
                .aggregate(aggregation, "order", OrderUser.class)
                .getMappedResults();
    }
}
