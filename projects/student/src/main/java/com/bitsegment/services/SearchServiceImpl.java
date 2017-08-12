package com.bitsegment.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bitsegment.dao.StudentDataDao;
import com.bitsegment.dao.StudentFeePaidDao;
import com.bitsegment.domain.StudentData;
import com.bitsegment.util.ServiceUtils;

@Service("searchService")
public class SearchServiceImpl implements SearchService {

	@Inject
	@Named("feePaidService")
	private FeePaidService feePaidService;

	@Inject
	@Named("studentDataDao")
	private StudentDataDao studentDataDao;

	@Inject
	@Named("studentFeePaidDao")
	private StudentFeePaidDao studentFeePaidDao;

	@Value("${search.list.limit}")
	private int searchListLimit;

	public List<StudentData> getAllStudents(int pageNumber) {
		return studentDataDao.getAllLimit(pageNumber * searchListLimit, searchListLimit);
	}

	@Override
	public List<StudentData> search(String paidTypeString, String yearString, String monthString, String searchQuery,
			int pageNumber, String sortFieldString, String sortOrderStrings) {
		PaidType paidType = PaidType.fromValue(paidTypeString);
		SortField sortField = SortField.fromValue(sortFieldString);
		SortOrder sortOrder = SortOrder.fromValue(sortOrderStrings);
		int year = ServiceUtils.convertYear(yearString);
		int month = ServiceUtils.convertMonth(monthString);
		SearchQueryType searchQueryType = SearchQueryType.fromValue(searchQuery);
		List<StudentData> results = studentDataDao.search(paidType, year, month, searchQueryType, searchQuery,
				pageNumber * searchListLimit, searchListLimit, sortField, sortOrder);

		feePaidService.fixSelectedStudentDataFeePaidRecord(results, month, year);

		return results;
	}

	@Override
	public long searchCount(String paidTypeString, String yearString, String monthString, String searchQuery) {
		PaidType paidType = PaidType.fromValue(paidTypeString);
		int year = ServiceUtils.convertYear(yearString);
		int month = ServiceUtils.convertMonth(monthString);
		SearchQueryType searchQueryType = SearchQueryType.fromValue(searchQuery);

		return studentDataDao.searchCount(paidType, year, month, searchQueryType, searchQuery);
	}

	@Override
	public int getSearchPageCount(long totalResults) {
		return (int) Math.ceil((double)totalResults / searchListLimit);
	}

	public StudentDataDao getStudentDataDao() {
		return studentDataDao;
	}

	public void setStudentDataDao(StudentDataDao studentDataDao) {
		this.studentDataDao = studentDataDao;
	}

	public StudentFeePaidDao getStudentFeePaidDao() {
		return studentFeePaidDao;
	}

	public void setStudentFeePaidDao(StudentFeePaidDao studentFeePaidDao) {
		this.studentFeePaidDao = studentFeePaidDao;
	}
}
