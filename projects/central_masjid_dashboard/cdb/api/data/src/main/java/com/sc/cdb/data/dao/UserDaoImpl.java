package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.auth.UserCompany;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

    private static final LookupOperation USER_COMPANY_LOOKUP_OPERATION = LookupOperation.newLookup()
            .from("company")
            .localField("companyId")
            .foreignField("_id")
            .as("company");

    @Override
    public List<UserCompany> findAllUserCompany() {
        Aggregation aggregation = Aggregation.newAggregation(USER_COMPANY_LOOKUP_OPERATION);
        return this.getMongoTemplate().aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }

    @Override
    public List<UserCompany> findUserCompanyByCompanyId(String companyId) {
        Criteria companyIdCriteria = Criteria.where("companyId").is(companyId);
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(companyIdCriteria), USER_COMPANY_LOOKUP_OPERATION);
        return this.getMongoTemplate().aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }

    @Override
    Class getType() {
        return User.class;
    }
}
