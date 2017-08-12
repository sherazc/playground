package com.sc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sc.domain.Attendee;

@Repository("attendeeDao")
public class AttendeeDaoImpl extends BaseDaoImpl<Attendee, Long> implements AttendeeDao {

	private static final long serialVersionUID = 1L;

	@Override
	public Class<Attendee> getEntityClass() {
		return Attendee.class;
	}
	
	@SuppressWarnings("unchecked")
	public List<Attendee> getAllAttendee() {
		return getEm().createNamedQuery("allAttendee").getResultList();
	}
}
