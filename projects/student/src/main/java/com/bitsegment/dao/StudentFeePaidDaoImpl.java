package com.bitsegment.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.bitsegment.domain.StudentFeePaid;

@Repository("studentFeePaidDao")
public class StudentFeePaidDaoImpl extends BaseDaoImpl<StudentFeePaid, Long> implements StudentFeePaidDao {

	private static final Log LOG = LogFactory.getLog(StudentFeePaidDaoImpl.class);

	@Override
	public Class<StudentFeePaid> getEntityClass() {
		return StudentFeePaid.class;
	}

}
