package com.sc.icd.dao;

import java.util.List;

import com.google.appengine.api.datastore.Key;
import com.sc.icd.domain.Attendee;

public interface AttendeeDao extends BaseDao<Attendee, Key> {

	List<Attendee> getByActivityId(Key activityId);

	Attendee saveAttendee(Attendee attendee, Key id);

}