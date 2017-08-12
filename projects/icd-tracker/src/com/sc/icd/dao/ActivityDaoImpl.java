package com.sc.icd.dao;

import com.google.appengine.api.datastore.Key;
import com.sc.icd.domain.Activity;

public class ActivityDaoImpl extends BaseDaoImpl<Activity, Key> implements ActivityDao {

	@Override
	public Class<Activity> getEntityClass() {
		return Activity.class;
	}

}
