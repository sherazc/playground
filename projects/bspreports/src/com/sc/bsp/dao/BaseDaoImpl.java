package com.sc.bsp.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import com.sc.bsp.utils.EMF;


public abstract class BaseDaoImpl<T extends Serializable, I extends Serializable> implements BaseDao<T, I> {

	@Override
	public T save(T t) {
		EntityManager em = this.getEm();
		EntityTransaction tx = em.getTransaction();
		tx.begin();

		T savedT = em.merge(t);
		em.flush();
		tx.commit();
		em.close();

		return savedT;
	}

	@Override
	public void removeById(I id) {
		EntityManager em = this.getEm();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		Object entity = em.find(getEntityClass(), id);
		// T entity = this.getById(id);
		if (entity != null) {
			// em.merge(entity);
			em.remove(entity);

		}

		em.flush();
		tx.commit();
		em.close();
	}

	@Override
	public T getById(I id) {
		EntityManager em = this.getEm();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		T result = em.find(getEntityClass(), id);
		tx.commit();
		em.close();
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		EntityManager em = this.getEm();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		List<T> result = em.createQuery("select t from " + getEntityClass().getName() + " t ").getResultList();
		// I have written line below to do eiger fetch. find out how to avoid
		// it.
		result.size();
		List<T> result2 = new ArrayList<T>();
		result2.addAll(result);
		em.flush();
		tx.commit();
		em.close();
		return result2;
	}

	public EntityManager getEm() {
		return EMF.get().createEntityManager();
	}

	public abstract Class<T> getEntityClass();
}
