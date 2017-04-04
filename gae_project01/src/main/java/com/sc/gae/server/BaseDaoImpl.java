package com.sc.gae.server;

import java.io.Serializable;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;

public abstract class BaseDaoImpl<T extends Serializable, I extends Serializable> implements BaseDao<T, I> {

	@PersistenceContext
	private EntityManager em;

	@Override
	// @Transactional
	public T save(T t) {
		T savedEntity = null;
		EntityTransaction et = em.getTransaction();
		et.begin();
		savedEntity = em.merge(t);
		em.flush();
		et.commit();
		em.close();
		return savedEntity;
	}

	@Override
	// @Transactional
	public void removeById(I id) {
		EntityTransaction et = em.getTransaction();
		et.begin();
		T entity = this.getById(id);
		if (entity != null) {
			em.remove(entity);
		}
		em.flush();
		et.commit();
		em.close();
	}

	@Override
	public T getById(I id) {
		return em.find(getEntityClass(), id);
	}

	public EntityManager getEm() {
		return em;
	}

	public void setEm(EntityManager em) {
		this.em = em;
	}

	public abstract Class<T> getEntityClass();
}
