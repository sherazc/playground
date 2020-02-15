package com.sc.cdb.data.dao;

import java.util.List;

import com.mongodb.client.result.UpdateResult;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.auth.UserCompany;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

    @Override
    public List<UserCompany> findAllUserCompany() {
        Aggregation aggregation = Aggregation.newAggregation(DaoConstants.COMPANY_LOOKUP_OPERATION);
        return this.getMongoTemplate().aggregate(aggregation, "user", UserCompany.class).getMappedResults();
    }

    @Override
    public List<UserCompany> findUserCompanyByCompanyId(String companyId) {
        Criteria criteria = Criteria
                .where("companyId")
                .is(new ObjectId(companyId));

        Aggregation aggregation = Aggregation
                .newAggregation(
                        Aggregation.match(criteria),
                        DaoConstants.COMPANY_LOOKUP_OPERATION);

        return this
                .getMongoTemplate()
                .aggregate(
                        aggregation,
                        "user",
                        UserCompany.class)
                .getMappedResults();
    }

    @Override
    public boolean activateUser(String userId, boolean active) {
        Query query = new Query(Criteria.where("_id").is(new ObjectId(userId)));
        Update update = new Update().set("active", active);
        UpdateResult updateResult = this.getMongoTemplate().updateMulti(query, update, User.class);
        return updateResult.getMatchedCount() > 0L;
    }

    @Override
    Class getType() {
        return User.class;
    }
}
