package com.bitsegment.web.controller;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Component;

import com.bitsegment.domain.StudentData;
import com.bitsegment.services.SearchService;
import com.bitsegment.util.DateUtils;
import com.bitsegment.util.ServiceUtils;

@Component("searchControllerHelper")
public class SearchControllerHelper {

	@Inject
	@Named("searchService")
	private SearchService searchService;

	public String searchByPaidTypeDateQueryPageAjaxOrder(String paidType, String yearString, String monthString,
			String searchQuery, int pageNumber, boolean ajaxFlag, String sortField, String sortOrder,
			Map<String, Object> model) {

		model.put("selectedPaidType", paidType);
		model.put("selectedYear", yearString);
		model.put("selectedMonth", monthString);
		model.put("searchQuery", searchQuery);
		model.put("pageNumber", pageNumber);
		model.put("ajaxFlag", ajaxFlag);
		model.put("sortField", sortField);
		model.put("sortOrder", sortOrder);
		
		int year = ServiceUtils.convertYear(yearString);
		int month = ServiceUtils.convertMonth(monthString);
		model.put("searchDateString", DateUtils.monthYearToString(month, year));

		List<StudentData> studentsResultList = searchService.search(paidType, yearString, monthString, searchQuery,
				pageNumber, sortField, sortOrder);
		long allStudentCount = searchService.searchCount(paidType, yearString, monthString, searchQuery);
		int pageCount = searchService.getSearchPageCount(allStudentCount);

		model.put("searchList", studentsResultList);
		model.put("searchCount", allStudentCount);
		model.put("pageCount", pageCount);
		if (ajaxFlag) {
			return "component/search-grid";
		} else {
			return "search-all";
		}

	}
}
