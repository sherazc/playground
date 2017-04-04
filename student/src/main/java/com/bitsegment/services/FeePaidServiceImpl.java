package com.bitsegment.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Service;

import com.bitsegment.dao.StudentDataDao;
import com.bitsegment.dao.StudentFeePaidDao;
import com.bitsegment.domain.StudentData;
import com.bitsegment.domain.StudentFeePaid;
import com.bitsegment.util.DateUtils;
import com.bitsegment.util.ServiceUtils;

@Service("feePaidService")
public class FeePaidServiceImpl implements FeePaidService {

	@Inject
	@Named("studentDataDao")
	private StudentDataDao studentDataDao;

	@Inject
	@Named("studentFeePaidDao")
	private StudentFeePaidDao studentFeePaidDao;
	
	public void fixSelectedStudentDataFeePaidRecord(List<StudentData> studentDatas, int month, int year) {
		Date startDate = DateUtils.getMonthStartDate(month, year);
		Date endDate = DateUtils.getMonthEndDate(month, year);

		for (StudentData studentData : studentDatas) {
			List<StudentFeePaid> studentFeePaids = studentData.getStudentFeePaids();
			if (studentFeePaids != null) {
				for (StudentFeePaid studentFeePaid : studentFeePaids) {
					Date feeDate = studentFeePaid.getFeeDate();
					if (feeDate != null && feeDate.after(startDate) && feeDate.before(endDate)) {
						studentData.setSelectedStudentFeePaid(studentFeePaid);
						break;
					}
				}
			}
		}
	}

	@Override
	public void saveFee(String studentIdString, String feeIdString, String feeValueString, String selectedYearString,
			String selectedMonthString, Map<String, Object> model) {
		Long studentId = ServiceUtils.toLong(studentIdString);
		Long feeId = ServiceUtils.toLong(feeIdString);
		Integer feeAmountPaid = ServiceUtils.toInt(feeValueString);
		Date feeDate = createFeeDate(selectedMonthString, selectedYearString);
		StudentData studentData = studentDataDao.getById(studentId);
		if (feeId != null) {
			StudentFeePaid studentFeePaid = null;
			for (StudentFeePaid sfp : studentData.getStudentFeePaids()) {
				if (sfp.getId() == feeId) {
					studentFeePaid = sfp;
					break;
				}
			}

			if (studentFeePaid != null) {
				if (feeAmountPaid != null) {
					studentFeePaid.setFeePaidAmount(feeAmountPaid);
					studentFeePaid.setDmlDate(new Date());
					studentFeePaid.setFeeDate(feeDate);
				} else {
					studentData.getStudentFeePaids().remove(studentFeePaid);
				}
			}

		} else {
			if (feeAmountPaid != null) {
				StudentFeePaid studentFeePaid = new StudentFeePaid();
				studentFeePaid.setFeePaidAmount(feeAmountPaid);
				studentFeePaid.setDmlDate(new Date());
				studentFeePaid.setFeeDate(feeDate);
				studentFeePaid.setStudentData(studentData);
				studentData.getStudentFeePaids().add(studentFeePaid);
			}
		}
	}

	private Date createFeeDate(String selectedMonthString, String selectedYearString) {
		Integer selectedYear = ServiceUtils.toInt(selectedYearString);
		Integer selectedMonth = ServiceUtils.toInt(selectedMonthString);
		Calendar todayCalendar = Calendar.getInstance();
		if (selectedYear == null) {
			selectedYear = todayCalendar.get(Calendar.YEAR);
		}
		if (selectedMonth == null) {
			selectedMonth = todayCalendar.get(Calendar.MONTH);
		}

		Date feeDate = DateUtils.createDateByMonthYear(selectedMonth, selectedYear);
		return feeDate;
	}
}
