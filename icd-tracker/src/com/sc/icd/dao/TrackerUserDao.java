package com.sc.icd.dao;

import com.google.appengine.api.datastore.Key;
import com.sc.icd.domain.TrackerUser;

public interface TrackerUserDao extends BaseDao<TrackerUser, Key> {

	TrackerUser getByName(String name);

	TrackerUser getByNamePassword(String name, String password);
}
