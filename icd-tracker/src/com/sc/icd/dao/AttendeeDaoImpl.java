package com.sc.icd.dao;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import com.google.appengine.api.datastore.Key;
import com.sc.icd.domain.Activity;
import com.sc.icd.domain.Attendee;

public class AttendeeDaoImpl extends BaseDaoImpl<Attendee, Key> implements AttendeeDao {

	@Override
	public Class<Attendee> getEntityClass() {
		return Attendee.class;
	}

	@Override
	public List<Attendee> getByActivityId(Key activityId) {
		if (activityId == null) {
			return null;
		}
		List<Attendee> attendees = null;
		EntityManager em = this.getEm();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		Activity dbActivity = em.find(Activity.class, activityId);
		if (dbActivity != null && dbActivity.getAttendees() != null) {
			attendees = new ArrayList<Attendee>(dbActivity.getAttendees());
		}
		attendees.size();
		tx.commit();
		em.close();
		return attendees;
	}

	@Override
	public Attendee saveAttendee(Attendee attendee, Key activityId) {
		EntityManager em = this.getEm();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		Attendee savedAttendee = null;
		Activity dbActivity = em.find(Activity.class, activityId);
		if (dbActivity != null) {
			if (dbActivity.getAttendees() == null) {
				dbActivity.setAttendees(new HashSet<Attendee>());
			}
			dbActivity.getAttendees().add(attendee);
			em.persist(dbActivity);
			em.flush();
			if (attendee.getId() != null) {
				savedAttendee = attendee;
			}
			tx.commit();
		}
		em.close();
		return savedAttendee;
	}
}
