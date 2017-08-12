package com.sc.gae.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

import com.sc.gae.dao.utils.EMF;

public abstract class BaseDaoImpl<T extends Serializable, I extends Serializable> implements BaseDao<T, I> {

	@Override
	public T save(T t) {
		return this.getEm().merge(t);
	}

	@Override
	public void removeById(I id) {
		System.out.println("Delete called");
		T entity = this.getById(id);
		if (entity != null) {
			this.getEm().remove(entity);
		}
		// Query query = EMF.getEntityManager().createQuery("delete from " +
		// getEntityClass().getName() + " e where e.id = :id");
		// query.setParameter("id", id);
		// query.executeUpdate();
	}

	@Override
	public T getById(I id) {
		return this.getEm().find(getEntityClass(), id);
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		return this.getEm().createQuery("select e from " + getEntityClass().getName() + " e ").getResultList();
	}

	public EntityManager getEm() {
		return EMF.getEntityManager();
	}

	public void setEm(EntityManager em) {
	}

	public abstract Class<T> getEntityClass();
}
