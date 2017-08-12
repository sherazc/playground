package com.sc.icd.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.appengine.api.datastore.Key;
import com.sc.icd.domain.TrackerUser;

public class TrackerUserDaoImpl extends BaseDaoImpl<TrackerUser, Key> implements TrackerUserDao {

	@Override
	public Class<TrackerUser> getEntityClass() {
		return TrackerUser.class;
	}

	@SuppressWarnings("unchecked")
	public TrackerUser getByName(String name) {
		if (name == null) {
			return null;
		}
		TrackerUser result = null;
		EntityManager em = this.getEm();
		Query query = em.createQuery("select tu from TrackerUser tu where tu.name = :name ");
		query.setParameter("name", name);
		List<TrackerUser> trackerUsers = query.getResultList();
		if (trackerUsers != null && trackerUsers.size() > 0) {
			result = trackerUsers.get(0);
		}
		em.close();
		return result;
	}

	public TrackerUser getByNamePassword(String name, String password) {
		if (name == null || password == null) {
			return null;
		}
		TrackerUser result = this.getByName(name);
		if (result != null && password.equals(result.getPassword())) {
			return result;
		} else {
			return null;
		}
	}

}
