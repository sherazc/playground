package com.sc.dao;

import java.util.List;

import com.sc.modal.OrderUser;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

@Repository
public class OrderUserDao {

    private MongoTemplate mongoTemplate;

    public OrderUserDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<OrderUser> findAllOrders() {
        LookupOperation lookupOperation = Aggregation
                .lookup("user", "userId", "_id", "user");

        Aggregation aggregation = Aggregation.newAggregation(lookupOperation);

        return mongoTemplate
                .aggregate(aggregation, "order", OrderUser.class)
                .getMappedResults();
    }

    public List<OrderUser> findOrderUserByUserId(String userId) {
        LookupOperation lookupOperation = Aggregation
                .lookup("user", "userId", "_id", "user");

        Criteria criteria = Criteria
                .where("userId")
                .is(new ObjectId(userId));
        MatchOperation matchOperation = Aggregation.match(criteria);

        Aggregation aggregation = Aggregation.newAggregation(lookupOperation, matchOperation);

        return mongoTemplate
                .aggregate(aggregation, "order", OrderUser.class)
                .getMappedResults();
    }
}
