package com.sc.springboot.dao.base;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

public abstract class BaseDaoJpaImpl<T, ID extends Serializable> extends BaseDaoImpl<T, ID> {

    private EntityManager entityManager;

    public BaseDaoJpaImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        return entityManager.createQuery("Select t from " + persistentClass.getSimpleName() + " t").getResultList();
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }
}
