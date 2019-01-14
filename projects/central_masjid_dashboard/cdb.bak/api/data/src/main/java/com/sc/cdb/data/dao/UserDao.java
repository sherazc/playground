package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.User;
import com.sc.cdb.data.model.UserCompany;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDao {

    private MongoTemplate mongoTemplate;
    private static final LookupOperation USER_COMPANY_LOOKUP_OPERATION = LookupOperation.newLookup()
            .from("company")
            .localField("companyId")
            .foreignField("_id")
            .as("company");


    public UserDao(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<UserCompany> findAll() {
        Aggregation aggregation = Aggregation.newAggregation(USER_COMPANY_LOOKUP_OPERATION);
        return mongoTemplate.aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }


    public List<UserCompany> findByCompanyId(String companyId) {
        Criteria companyIdCriteria = Criteria.where("companyId").is(companyId);
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(companyIdCriteria), USER_COMPANY_LOOKUP_OPERATION);
        return mongoTemplate.aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }
}
