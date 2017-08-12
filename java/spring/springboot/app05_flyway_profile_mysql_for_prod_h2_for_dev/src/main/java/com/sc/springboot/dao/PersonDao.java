package com.sc.springboot.dao;

import com.sc.springboot.domain.Person;

import java.util.List;

public interface PersonDao {
    List<Person> getAll();
}
