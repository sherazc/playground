package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.auth.UserCompany;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface UserDao extends BaseDao<User> {

    List<UserCompany> findAllUserCompany();

    List<UserCompany> findUserCompanyByCompanyId(String companyId);
}
