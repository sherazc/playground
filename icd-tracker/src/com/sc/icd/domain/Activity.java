package com.sc.icd.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@Entity
@Table(name = "ACTIVITY")
public class Activity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Key id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "ACTIVITY_DATE")
	private Date activityDate;

	@Column(name = "DESCRIPTION")
	private String description;

	@OneToMany(fetch = FetchType.LAZY)
	private Set<Attendee> attendees = new HashSet<Attendee>(0);

	public Activity() {
		super();
	}

	public Activity(Key id, String name, Date activityDate, String description) {
		super();
		this.id = id;
		this.name = name;
		this.activityDate = activityDate;
		this.description = description;
	}

	public Key getId() {
		return id;
	}

	public void setId(Key id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(Date activityDate) {
		this.activityDate = activityDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Attendee> getAttendees() {
		return attendees;
	}

	public void setAttendees(Set<Attendee> attendees) {
		this.attendees = attendees;
	}

	@Override
	@Transient
	public String getEncodedId() {
		return id != null ? KeyFactory.keyToString(id) : null;
	}
}
