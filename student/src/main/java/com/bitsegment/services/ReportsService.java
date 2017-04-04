package com.bitsegment.services;

import java.util.List;

import com.bitsegment.web.command.ReportItem;

public interface ReportsService {
	void buildReports(List<ReportItem> reportList, int month, int year);
}
