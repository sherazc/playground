package com.bitsegment.services;

public enum SortField {
	firstName, lastName, guardianFirstName, guardianLastName, registrationDate, none;

	public static SortField fromValue(String value) {
		SortField result = null;

		for (SortField type : SortField.values()) {
			if (value != null && type.toString().equalsIgnoreCase(value.trim())) {
				result = type;
				break;
			}
		}
		return result == null ? SortField.none : result;
	}
}
