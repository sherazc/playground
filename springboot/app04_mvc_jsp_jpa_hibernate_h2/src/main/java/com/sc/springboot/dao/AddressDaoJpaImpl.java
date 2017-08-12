package com.sc.springboot.dao;

import com.sc.springboot.dao.base.BaseDaoJpaImpl;
import com.sc.springboot.domain.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository(value = "addressDaoJpa")
public class AddressDaoJpaImpl extends BaseDaoJpaImpl<Address, Long> implements AddressDao {
    @Autowired
    public AddressDaoJpaImpl(EntityManager entityManager) {
        super(entityManager);
    }
}
