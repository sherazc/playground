package com.sc.springboot.dao.base;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.io.Serializable;
import java.util.List;

public abstract class BaseDaoHibernateImpl<T, ID extends Serializable> extends BaseDaoImpl<T, ID> {

    private SessionFactory sessionFactory;

    public BaseDaoHibernateImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        return getCurrentSession().createQuery("from " + persistentClass.getSimpleName() + " t").list();
    }


    protected Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }
}
