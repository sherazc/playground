package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoHibernateImpl;
import com.sc.springboot.domain.Item;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository(value = "itemDaoHibernate")
public class ItemDaoHibernateImpl extends BaseDaoHibernateImpl<Item, Long> implements ItemDao {

    @Autowired
    public ItemDaoHibernateImpl(@Autowired SessionFactory sessionFactory) {
        super(sessionFactory);
    }
}
