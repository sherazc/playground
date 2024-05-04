package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.auth.User;


public interface UserDao extends BaseDao<User> {
    boolean activateUser(String userId, boolean active);
}
