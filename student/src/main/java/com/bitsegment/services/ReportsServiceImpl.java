package com.bitsegment.services;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Service;

import com.bitsegment.domain.StudentData;
import com.bitsegment.domain.StudentFeePaid;
import com.bitsegment.util.DateUtils;
import com.bitsegment.web.command.ReportItem;

@Service("reportsService")
public class ReportsServiceImpl implements ReportsService {

	@Inject
	@Named("searchService")
	private SearchService searchService;

	public void buildReports(List<ReportItem> reportList) {

	}

	@Override
	public void buildReports(List<ReportItem> reportList, int month, int year) {
		List<StudentData> students = searchService.search(PaidType.all.toString(), year + "", month + "",
				SearchQueryType.searchany.toString(), -1, SortField.none.toString(), SortOrder.asc.toString());

		Date dateStart = DateUtils.getMonthStartDate(month, year);
		Date dateEnd = DateUtils.getMonthEndDate(month, year);

		reportList.add(new ReportItem(100, "Total Students", "" + students.size()));

		int totalFeeCollected = getTotalFeeCollected(students, dateStart, dateEnd);
		int totalExpectedFee = getExpectedFee(students);
		
		int paidStudents = 0;
		int unpaidStudents = 0;
		
		for (StudentData studentData : students) {
			boolean feePaid = false;
			for (StudentFeePaid studentFeePaid : studentData.getStudentFeePaids()) {
				
				if (studentFeePaid.getFeeDate() != null && studentFeePaid.getFeeDate().after(dateStart)
						&& studentFeePaid.getFeeDate().before(dateEnd) && studentFeePaid.getFeePaidAmount() != null) {
					paidStudents++;
					feePaid = true;
					break;
				}
			}
			if (!feePaid) {
				unpaidStudents++;
			}
		}
		
		int averageExpectedFee = getAverageExpectedFee(students, totalExpectedFee);
		int averageCollectedFee = getAverageCollectedFee(totalFeeCollected, paidStudents);
		int averageFeeDiscount = averageExpectedFee - averageCollectedFee;
		
		reportList.add(new ReportItem(200, "Fee Expected", "" + totalExpectedFee));
		reportList.add(new ReportItem(300, "Fee Collected", "" + totalFeeCollected));
		reportList.add(new ReportItem(400, "Total Paid Student", "" + paidStudents));
		reportList.add(new ReportItem(500, "Total Unpaid Student", "" + unpaidStudents));
		reportList.add(new ReportItem(500, "Average Setup Fee Per Student", "" + averageExpectedFee));
		reportList.add(new ReportItem(500, "Average Collected Fee Per Student", "" + averageCollectedFee));
		reportList.add(new ReportItem(500, "Average Collected Fee Discount", "" + averageFeeDiscount));
		
	}

	private int getAverageCollectedFee(int totalFeeCollected, int paidStudents) {
		if (paidStudents < 1) {
			return 0;
		}
		int averageCollectedFee = totalFeeCollected / paidStudents;
		return averageCollectedFee;
	}

	private int getAverageExpectedFee(List<StudentData> students, int totalExpectedFee) {
		if (students == null || students.size() < 1) {
			return 0;
		}
		int averageExpectedFee = totalExpectedFee / students.size();
		return averageExpectedFee;
	}

	private int getExpectedFee(List<StudentData> students) {
		int totalExpectedFee = 0;
		
		for (StudentData studentData : students) {
			if (studentData.getFee() != null) {
				totalExpectedFee += studentData.getFee();
			}
		}
		return totalExpectedFee;
	}

	private int getTotalFeeCollected(List<StudentData> students, Date dateStart, Date dateEnd) {
		int totalFeeCollected = 0;

		for (StudentData studentData : students) {
			for (StudentFeePaid studentFeePaid : studentData.getStudentFeePaids()) {
				if (studentFeePaid.getFeeDate() != null && studentFeePaid.getFeeDate().after(dateStart)
						&& studentFeePaid.getFeeDate().before(dateEnd) && studentFeePaid.getFeePaidAmount() != null) {
					totalFeeCollected += studentFeePaid.getFeePaidAmount(); 
				}
			}
		}
		return totalFeeCollected;
	}

	private int getTotalFeeCollected(List<StudentData> students) {
		// TODO Auto-generated method stub
		return 0;
	}

}
