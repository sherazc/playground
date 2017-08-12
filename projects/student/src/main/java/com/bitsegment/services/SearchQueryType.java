package com.bitsegment.services;

import org.apache.commons.lang.StringUtils;

public enum SearchQueryType {
	searchany, searchquery;

	public static SearchQueryType fromValue(String value) {
		SearchQueryType searchQueryTypeResult = null;

		for (SearchQueryType searchQueryType : SearchQueryType.values()) {
			if (value != null && searchQueryType.toString().equalsIgnoreCase(value.trim())) {
				searchQueryTypeResult = searchQueryType;
				break;
			}
		}

		if (searchQueryTypeResult == null && StringUtils.isNotBlank(value)) {
			searchQueryTypeResult = searchquery;
		}

		return searchQueryTypeResult == null ? SearchQueryType.searchany : searchQueryTypeResult;
	}
}
