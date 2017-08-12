package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoHibernateImpl;
import com.sc.springboot.domain.Customer;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository(value = "customerDaoHibernate")
public class CustomerDaoHibernateImpl extends BaseDaoHibernateImpl<Customer, Long> implements CustomerDao {

    @Autowired
    public CustomerDaoHibernateImpl(@Autowired SessionFactory sessionFactory) {
        super(sessionFactory);
    }
}
