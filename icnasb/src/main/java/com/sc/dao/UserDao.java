package com.sc.dao;

import com.sc.domain.User;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("userDao")
public class UserDao extends BaseDao<User> {

    @Override
    protected Class<User> getEntityClass() {
        return User.class;
    }

    public User findByUsername(String username) {

        List<User> users = this.find(Criteria.where("username").is(username));

        if (users != null && users.size() > 0) {
            return users.get(0);
        } else {
            return null;
        }
    }
}
