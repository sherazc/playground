package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.auth.UserCompany;


public interface UserDao extends BaseDao<User> {

    List<UserCompany> findAllUserCompany();

    List<UserCompany> findUserCompanyByCompanyId(String companyId);

    boolean activateUser(String userId, boolean active);
}
