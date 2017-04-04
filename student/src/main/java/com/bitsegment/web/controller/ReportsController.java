package com.bitsegment.web.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bitsegment.services.ReportsService;
import com.bitsegment.util.DateUtils;
import com.bitsegment.util.ServiceUtils;
import com.bitsegment.web.command.ReportItem;
import com.bitsegment.web.command.ReportItemComparator;

@Controller("reportsController")
@RequestMapping("/reports")
public class ReportsController {

	@Inject
	@Named("reportsService")
	private ReportsService reportsService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String defaultReports(Map<String, Object> model) {
		int month = DateUtils.getTodaysMonth();
		int year = DateUtils.getTodaysYear();
		return reportsByMonthYear(year + "", month + "", model);
	}

	@RequestMapping(value = "/{year}/{month}", method = RequestMethod.GET)
	public String reportsByMonthYear(@PathVariable("year") String yearString,
			@PathVariable("month") String monthString, Map<String, Object> model) {
		int month = ServiceUtils.convertMonth(monthString);
		int year = ServiceUtils.convertYear(yearString);
		
		String dateString = DateUtils.monthYearToString(month, year);
		
		List<ReportItem> reportList = new ArrayList<ReportItem>();
		reportsService.buildReports(reportList, month, year);
		Collections.sort(reportList, new ReportItemComparator());
		model.put("reportList", reportList);
		model.put("dateString", dateString);
		return "reports";
	}
	
	
}
