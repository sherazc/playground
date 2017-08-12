package com.sc.services;

import java.util.Comparator;

import org.apache.commons.lang.StringUtils;

import com.sc.domain.Attendee;

public class AttendeeComparator implements Comparator<Attendee> {

	public static final int SORT_FIRST_NAME = 23;
	public static final int SORT_LAST_NAME = 54;
	public static final int SORT_CITY = 656;
	public static final int SORT_STATE = 2334;
	public static final int SORT_ZIP = 3424;

	private int field;
	private boolean acending;

	public AttendeeComparator(int field, boolean acending) {
		this.field = field;
		this.acending = acending;
	}

	@Override
	public int compare(Attendee o1, Attendee o2) {
		int sort = 0;
		switch (field) {
		case SORT_FIRST_NAME:
			if (acending) {
				sort = StringUtils.defaultString(o1.getFirstName()).compareTo(
						StringUtils.defaultString(o2.getFirstName()));
			} else {
				sort = StringUtils.defaultString(o2.getFirstName()).compareTo(
						StringUtils.defaultString(o1.getFirstName()));
			}
			break;
		case SORT_LAST_NAME:
			if (acending) {
				sort = StringUtils.defaultString(o1.getLastName()).compareTo(
						StringUtils.defaultString(o2.getLastName()));
			} else {
				sort = StringUtils.defaultString(o2.getLastName()).compareTo(
						StringUtils.defaultString(o1.getLastName()));
			}
			break;
		case SORT_CITY:
			if (acending) {
				sort = StringUtils.defaultString(o1.getCity()).compareTo(StringUtils.defaultString(o2.getCity()));
			} else {
				sort = StringUtils.defaultString(o2.getCity()).compareTo(StringUtils.defaultString(o1.getCity()));
			}
			break;
		case SORT_STATE:
			if (acending) {
				sort = StringUtils.defaultString(o1.getState()).compareTo(StringUtils.defaultString(o2.getState()));
			} else {
				sort = StringUtils.defaultString(o2.getState()).compareTo(StringUtils.defaultString(o1.getState()));
			}
			break;
		case SORT_ZIP:
			if (acending) {
				sort = StringUtils.defaultString(o1.getZipCode()).compareTo(StringUtils.defaultString(o2.getZipCode()));
			} else {
				sort = StringUtils.defaultString(o2.getZipCode()).compareTo(StringUtils.defaultString(o1.getZipCode()));
			}
			break;
		default:
			sort = 0;
			break;
		}
		return sort;
	}

}
