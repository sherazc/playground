package com.bitsegment.services;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Service;

import com.bitsegment.dao.StudentDataDao;
import com.bitsegment.domain.StudentData;

@Service("studentDataService")
public class StudentDataServiceImpl implements StudentDataService {

	@Inject
	@Named("studentDataDao")
	private StudentDataDao studentDataDao;

	public StudentData getStudentById(Long studentId) {
		if (studentId == null) {
			return null;
		}
		return studentDataDao.getById(studentId);
	}

	@Override
	public void save(StudentData studentData) {
		Date today = new Date();
		if (studentData.getId() == null) {
			studentData.setCreateDate(today);
		}
		if (studentData.getRegistrationDate() == null) {
			studentData.setRegistrationDate(today);
		}
		studentData.setDmlDate(today);
		studentDataDao.save(studentData);
	}

	@Override
	public void deleteStudentById(Long studentId) {
		if (studentId == null || studentId < 1) {
			return;
		}
		studentDataDao.removeById(studentId);
	}
}
