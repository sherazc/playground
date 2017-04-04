package com.bitsegment.web.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.bitsegment.domain.StudentData;
import com.bitsegment.services.SearchQueryType;
import com.bitsegment.util.DateUtils;
import com.bitsegment.util.ServiceUtils;
import com.bitsegment.web.command.ReportItem;

@Component("excelStudentDataView")
public class ExcelStudentDataView extends AbstractExcelView {

	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook, HttpServletRequest requect,
			HttpServletResponse response) throws Exception {

		HSSFSheet searchSheet = workbook.createSheet("Students");
		HSSFSheet reportsSheet = workbook.createSheet("Monthly Reports");

		makeSearchCriteriaDesc(model, workbook, searchSheet);
		Integer searchSheetRowIndex = 2;
		searchSheetRowIndex = addSearchHeaderRow(workbook, searchSheet, searchSheetRowIndex);
		addStudentDataRows(model, workbook, searchSheet, searchSheetRowIndex);

		makeReportCriteriaDesc(model, workbook, reportsSheet);
		Integer reportsSheetRowIndex = 2;
		reportsSheetRowIndex = addReportsHeaderRow(workbook, reportsSheet, reportsSheetRowIndex);
		addReportsDataRows(model, workbook, reportsSheet, reportsSheetRowIndex);

		fixColumnSize(searchSheet);
		fixColumnSize(reportsSheet);
	}

	private Integer addReportsHeaderRow(HSSFWorkbook workbook, HSSFSheet sheet, Integer sheetRowIndex) {
		HSSFRow header = sheet.createRow(sheetRowIndex++);
		Integer headerColumnIndex = 0;
		addHeader(workbook, header, "Report Item", headerColumnIndex++);
		addHeader(workbook, header, "Report Value", headerColumnIndex++);
		return sheetRowIndex;
	}

	private void makeReportCriteriaDesc(Map<String, Object> model, HSSFWorkbook workbook, HSSFSheet sheet) {
		CellRangeAddress searchCriteriaDescRange = CellRangeAddress.valueOf("A1:B1");
		sheet.addMergedRegion(searchCriteriaDescRange);
		HSSFRow row = sheet.createRow(0);
		Cell cell = row.createCell(0);
		String description = "Reports. Date=";
		description += model.get("dateString");
		cell.setCellValue(description);
		cell.setCellStyle(getHeaderCellStyle(workbook));
	}

	private void makeSearchCriteriaDesc(Map<String, Object> model, HSSFWorkbook workbook, HSSFSheet sheet) {
		CellRangeAddress searchCriteriaDescRange = CellRangeAddress.valueOf("A1:E1");
		sheet.addMergedRegion(searchCriteriaDescRange);
		HSSFRow row = sheet.createRow(0);
		Cell cell = row.createCell(0);
		String description = "Student Data Export. Paid Type=";
		description += model.get("selectedPaidType");
		description += ", Date=";
		description += model.get("searchDateString");
		Object searchQuery = model.get("searchQuery");
		if (searchQuery != null && SearchQueryType.fromValue(searchQuery.toString()) != SearchQueryType.searchany) {
			description += ", Search=";
			description += searchQuery;
		}
		cell.setCellValue(description);
		cell.setCellStyle(getHeaderCellStyle(workbook));
	}

	private Integer addSearchHeaderRow(HSSFWorkbook workbook, HSSFSheet sheet, Integer sheetRowIndex) {
		HSSFRow header = sheet.createRow(sheetRowIndex++);
		Integer headerColumnIndex = 0;
		addHeader(workbook, header, "First Name", headerColumnIndex++);
		addHeader(workbook, header, "Last Name", headerColumnIndex++);
		addHeader(workbook, header, "Guardian First Name", headerColumnIndex++);
		addHeader(workbook, header, "Guardian Last Name", headerColumnIndex++);
		addHeader(workbook, header, "Registration Date", headerColumnIndex++);
		addHeader(workbook, header, "Phone", headerColumnIndex++);
		addHeader(workbook, header, "Setup Fee", headerColumnIndex++);
		addHeader(workbook, header, "Fee Paid", headerColumnIndex++);
		return sheetRowIndex;
	}

	@SuppressWarnings("unchecked")
	private void addReportsDataRows(Map<String, Object> model, HSSFWorkbook workbook, HSSFSheet sheet,
			Integer sheetRowIndex) {
		List<ReportItem> reportList = (List<ReportItem>) model.get("reportList");
		if (reportList == null || reportList.size() < 1) {
			return;
		}

		for (ReportItem reportItem : reportList) {
			Integer dataColumnIndex = 0;
			HSSFRow row = sheet.createRow(sheetRowIndex++);
			row.createCell(dataColumnIndex++).setCellValue(reportItem.getField());
			row.createCell(dataColumnIndex++).setCellValue(ServiceUtils.toInt(reportItem.getValue()));
		}
	}

	@SuppressWarnings("unchecked")
	private void addStudentDataRows(Map<String, Object> model, HSSFWorkbook workbook, HSSFSheet sheet,
			Integer sheetRowIndex) {
		List<StudentData> students = (List<StudentData>) model.get("searchList");
		if (students == null || students.size() < 1) {
			return;
		}
		for (StudentData student : students) {
			Integer dataColumnIndex = 0;
			HSSFRow row = sheet.createRow(sheetRowIndex++);
			row.createCell(dataColumnIndex++).setCellValue(student.getFirstName());
			row.createCell(dataColumnIndex++).setCellValue(student.getLastName());
			row.createCell(dataColumnIndex++).setCellValue(student.getGuardianFirstName());
			row.createCell(dataColumnIndex++).setCellValue(student.getGuardianLastName());
			if (student.getRegistrationDate() == null) {
				dataColumnIndex++;
			} else {
				row.createCell(dataColumnIndex++).setCellValue(
						DateUtils.dateToMonthYearString(student.getRegistrationDate()));
			}

			row.createCell(dataColumnIndex++).setCellValue(student.getFormatedPhoneNumber());
			row.createCell(dataColumnIndex++).setCellValue(student.getFee());
			if (student.getSelectedStudentFeePaid() == null) {
				dataColumnIndex++;
			} else {
				row.createCell(dataColumnIndex++).setCellValue(student.getSelectedStudentFeePaid().getFeePaidAmount());
			}
		}
	}

	private void fixColumnSize(HSSFSheet sheet) {
		for (int i = 0; i < 500; i++) {
			sheet.autoSizeColumn(i);
		}
	}

	private void addHeader(HSSFWorkbook workbook, HSSFRow header, String value, Integer cellNumber) {
		Cell cell = header.createCell(cellNumber);
		cell.setCellStyle(getHeaderCellStyle(workbook));
		cell.setCellValue(value);
	}

	private CellStyle getHeaderCellStyle(HSSFWorkbook workbook) {
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		headerFont.setColor(IndexedColors.WHITE.getIndex());
		headerStyle.setFont(headerFont);
		headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
		headerStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
		return headerStyle;
	}
}
