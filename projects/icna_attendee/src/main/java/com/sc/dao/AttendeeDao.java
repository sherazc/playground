package com.sc.dao;

import java.util.List;

import com.sc.domain.Attendee;

public interface AttendeeDao extends BaseDao<Attendee, Long> {
	List<Attendee> getAllAttendee();
}
