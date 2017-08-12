package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoHibernateImpl;
import com.sc.springboot.domain.CustomerOrder;
import com.sc.springboot.domain.Item;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository(value = "customerOrderDaoHibernate")
public class CustomerOrderDaoHibernateImpl extends BaseDaoHibernateImpl<CustomerOrder, Long> implements CustomerOrderDao {

    @Autowired
    public CustomerOrderDaoHibernateImpl(@Autowired SessionFactory sessionFactory) {
        super(sessionFactory);
    }
}
