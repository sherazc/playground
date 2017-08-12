package com.bitsegment.dao;

import java.util.List;

import com.bitsegment.domain.StudentData;
import com.bitsegment.services.PaidType;
import com.bitsegment.services.SearchQueryType;
import com.bitsegment.services.SortField;
import com.bitsegment.services.SortOrder;

public interface StudentDataDao extends BaseDao<StudentData, Long> {

	long getStudentDataCount();

	List<StudentData> search(PaidType paidType, int year, int month, SearchQueryType searchQueryType,
			String searchQuery, int pageNumber, int maxResults, SortField sortField, SortOrder sortOrder);
	
	long searchCount(PaidType paidType, int year, int month, SearchQueryType searchQueryType, String searchQuery);

}
