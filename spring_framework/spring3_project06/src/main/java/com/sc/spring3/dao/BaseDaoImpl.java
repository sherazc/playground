package com.sc.spring3.dao;

import java.io.Serializable;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public abstract class BaseDaoImpl<T extends Serializable, I extends Serializable> implements BaseDao<T, I> {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public void save(T t) {
		getSession().saveOrUpdate(t);
	}

	@Override
	@Transactional
	public void removeById(I id) {
		T entity = this.getById(id);
		if (entity != null) {
			getSession().delete(entity);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public T getById(I id) {
		return (T) openSession().get(getEntityClass(), id);
	}

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
	public Session openSession() {
		return sessionFactory.openSession();
	}
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public abstract Class<T> getEntityClass();
}
