package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoJpaImpl;
import com.sc.springboot.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository(value = "itemDaoJpa")
public class ItemDaoJpaImpl extends BaseDaoJpaImpl<Item, Long> implements ItemDao {
    @Autowired
    public ItemDaoJpaImpl(EntityManager entityManager) {
        super(entityManager);
    }
}
