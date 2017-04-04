package com.bitsegment.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public abstract class BaseDaoImpl<T extends Serializable, I extends Serializable> implements BaseDao<T, I> {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public T save(T t) {
		return this.getEm().merge(t);
	}

	@Override
	public void removeById(I id) {
		T entity = this.getById(id);
		if (entity != null) {
			this.getEm().remove(entity);
		}
	}
	
	@Override
	public void remove(T entity) {
		this.getEm().remove(entity);
	}
	

	@Override
	public T getById(I id) {
		return this.getEm().find(getEntityClass(), id);
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		return this.getEm().createQuery("from " + getEntityClass().getName()).getResultList();
	}
	
	@SuppressWarnings("unchecked")
	public List<T> getAllLimit(int firstResultIndex, int maxResults) {
		Query query = this.getEm().createQuery("from " + getEntityClass().getName());
		query.setFirstResult(firstResultIndex);
		query.setMaxResults(maxResults);
		return query.getResultList();
	} 

	public EntityManager getEm() {
		return em;
	}

	public void setEm(EntityManager em) {
		this.em = em;
	}


	public abstract Class<T> getEntityClass();
}
