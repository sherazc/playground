package com.bitsegment.services;

import java.util.List;

import com.bitsegment.domain.StudentData;

public interface SearchService {
	List<StudentData> getAllStudents(int pageNumber);

	int getSearchPageCount(long totalResults);

	List<StudentData> search(String paidTypeString, String yearString, String monthString, String searchQuery,
			int pageNumber, String sortFieldString, String sortOrderStrings);

	long searchCount(String paidTypeString, String yearString, String monthString, String searchQuery);
}
