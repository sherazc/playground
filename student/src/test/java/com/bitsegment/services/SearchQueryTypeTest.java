package com.bitsegment.services;

import junit.framework.Assert;

import org.junit.Test;

public class SearchQueryTypeTest {

	@Test
	public void testSearchQueryTypeFromValue() {
		Assert.assertEquals(SearchQueryType.searchany, SearchQueryType.fromValue("searchany"));
		Assert.assertEquals(SearchQueryType.searchany, SearchQueryType.fromValue("SEARCHANY"));
		Assert.assertEquals(SearchQueryType.searchany, SearchQueryType.fromValue(" SEARCHANY "));
		Assert.assertEquals(SearchQueryType.searchany, SearchQueryType.fromValue(null));
		Assert.assertEquals(SearchQueryType.searchany, SearchQueryType.fromValue(""));
		Assert.assertEquals(SearchQueryType.searchquery, SearchQueryType.fromValue(" Some query String "));
		Assert.assertEquals(SearchQueryType.searchquery, SearchQueryType.fromValue("q"));
	}
}
