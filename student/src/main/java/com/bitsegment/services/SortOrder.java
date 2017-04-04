package com.bitsegment.services;

public enum SortOrder {
	asc, desc;
	
	public static SortOrder fromValue(String value) {
		SortOrder result = null;

		for (SortOrder type : SortOrder.values()) {
			if (value != null && type.toString().equalsIgnoreCase(value.trim())) {
				result = type;
				break;
			}
		}
		return result == null ? SortOrder.asc : result;
	}
}
