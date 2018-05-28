package com.sc.springboot.dao;

import com.sc.springboot.domain.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository(value = "personDao")
public class PersonDaoImpl implements PersonDao {
    private EntityManager entityManager;

    @Autowired
    public PersonDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Person> getAll() {
        return entityManager.createNamedQuery("getAllPersons").getResultList();
    }
}
