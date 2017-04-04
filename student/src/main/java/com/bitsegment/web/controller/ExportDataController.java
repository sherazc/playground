package com.bitsegment.web.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/export")
public class ExportDataController {
	
	@Inject
	@Named("searchController")
	private SearchController searchController;
	
	@Inject
	@Named("excelStudentDataView")
	private ExcelStudentDataView excelStudentDataView;
	
	@Inject
	@Named("reportsController")
	private ReportsController reportsController;
	
	@RequestMapping("/{paidType}/{year}/{month}/{searchQuery}/**")
	public ModelAndView search(HttpServletRequest request,
			HttpServletResponse response, Map<String, Object> model, @PathVariable("paidType") String paidType,
			@PathVariable("year") String yearString, @PathVariable("month") String monthString,
			@PathVariable("searchQuery") String searchQuery) {
		
		String contentDisposition = "attachment; filename=\"";
		contentDisposition += "Student Export - ";
		contentDisposition += new SimpleDateFormat("yyyy-MM-dd h-mm a").format(new Date());
		contentDisposition += ".xls\"";
		response.setHeader("Content-Disposition", contentDisposition);
		searchController.searchByPaidTypeDateQueryPage(paidType, yearString, monthString, searchQuery, -1, model);
		reportsController.reportsByMonthYear(yearString, monthString, model);
		return new ModelAndView(excelStudentDataView, model);
	}
}
