package com.sc.services;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.sc.domain.Attendee;

@Component("attendeeFieldSorter")
public class AttendeeFieldSorter implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private List<Attendee> attendees;
	private boolean firstNameAscending;
	private boolean lastNameAscending;
	private boolean cityAscending;
	private boolean stateAscending;
	private boolean zipAscending;
	
	
	public AttendeeFieldSorter() {
	}

	public void sortByFirstName() {
		Collections.sort(this.getAttendees(), new AttendeeComparator(AttendeeComparator.SORT_FIRST_NAME, firstNameAscending));
		firstNameAscending = !firstNameAscending;
	}
	
	public void sortByLastName() {
		Collections.sort(this.getAttendees(), new AttendeeComparator(AttendeeComparator.SORT_LAST_NAME, lastNameAscending));
		lastNameAscending = !lastNameAscending;
	}
	
	public void sortByCity() {
		Collections.sort(this.getAttendees(), new AttendeeComparator(AttendeeComparator.SORT_CITY, cityAscending));
		cityAscending = !cityAscending;
	}
	
	public void sortByState() {
		Collections.sort(this.getAttendees(), new AttendeeComparator(AttendeeComparator.SORT_STATE, stateAscending));
		stateAscending = !stateAscending;
	}
	
	public void sortByZip() {
		Collections.sort(this.getAttendees(), new AttendeeComparator(AttendeeComparator.SORT_ZIP, zipAscending));
		zipAscending = !zipAscending;
	}
	private List<Attendee> getAttendees() {
		if (this.attendees == null) {
			return new ArrayList<Attendee>();
		} else {
			return attendees;
		}
	}

	public void setAttendees(List<Attendee> attendees) {
		this.attendees = attendees;
	}
	
	
}
