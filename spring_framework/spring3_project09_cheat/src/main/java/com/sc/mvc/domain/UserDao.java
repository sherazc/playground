package com.sc.mvc.domain;

public interface UserDao {
    User getForUsername(String username);

    void createUser(User user);
}