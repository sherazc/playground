package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.auth.UserCompany;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
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
        .is(companyId);

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
  Class getType() {
    return User.class;
  }
}
