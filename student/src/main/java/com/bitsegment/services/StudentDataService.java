package com.bitsegment.services;

import com.bitsegment.domain.StudentData;

public interface StudentDataService {

	StudentData getStudentById(Long studentId);
	
	void save(StudentData studentData);

	void deleteStudentById(Long studentId);
}
