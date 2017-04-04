package com.bitsegment.services;

import java.util.List;
import java.util.Map;

import com.bitsegment.domain.StudentData;

public interface FeePaidService {
	void fixSelectedStudentDataFeePaidRecord(List<StudentData> studentDatas, int month, int year);

	void saveFee(String studentIdString, String feeIdString, String feeValueString, String selectedYearString,
			String selectedMonthString, Map<String, Object> model);
}
