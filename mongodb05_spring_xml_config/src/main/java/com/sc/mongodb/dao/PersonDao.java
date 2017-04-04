package com.sc.mongodb.dao;

import com.sc.mongodb.domain.Person;

public interface PersonDao {
    void insert(Person person);
    Person findById(String id);
    void update(Person person);
    int deleteById(String id);
}
