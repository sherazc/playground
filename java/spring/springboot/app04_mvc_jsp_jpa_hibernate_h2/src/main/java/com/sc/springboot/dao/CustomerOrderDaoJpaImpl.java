package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoJpaImpl;
import com.sc.springboot.domain.CustomerOrder;
import com.sc.springboot.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository(value = "customerOrderDaoJpa")
public class CustomerOrderDaoJpaImpl extends BaseDaoJpaImpl<CustomerOrder, Long> implements CustomerOrderDao {
    @Autowired
    public CustomerOrderDaoJpaImpl(EntityManager entityManager) {
        super(entityManager);
    }
}
