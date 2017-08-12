package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoJpaImpl;
import com.sc.springboot.domain.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository(value = "customerDaoJpa")
public class CustomerDaoJpaImpl extends BaseDaoJpaImpl<Customer, Long> implements CustomerDao {
    @Autowired
    public CustomerDaoJpaImpl(EntityManager entityManager) {
        super(entityManager);
    }
}
