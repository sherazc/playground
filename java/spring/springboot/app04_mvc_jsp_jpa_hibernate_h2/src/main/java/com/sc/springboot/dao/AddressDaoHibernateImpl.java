package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoHibernateImpl;
import com.sc.springboot.domain.Address;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository(value = "addressDaoHibernate")
public class AddressDaoHibernateImpl extends BaseDaoHibernateImpl<Address, Long> implements AddressDao {

    @Autowired
    public AddressDaoHibernateImpl(@Autowired SessionFactory sessionFactory) {
        super(sessionFactory);
    }
}
