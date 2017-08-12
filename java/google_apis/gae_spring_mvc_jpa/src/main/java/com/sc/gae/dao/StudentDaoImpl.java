package com.sc.gae.dao;

import org.springframework.stereotype.Repository;

import com.sc.gae.domain.Student;

@Repository("studentDao")
public class StudentDaoImpl extends BaseDaoImpl<Student, Long> implements StudentDao {

	@Override
	public Class<Student> getEntityClass() {
		return Student.class;
	}

}
