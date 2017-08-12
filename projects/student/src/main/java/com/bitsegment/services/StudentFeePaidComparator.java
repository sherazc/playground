package com.bitsegment.services;

import java.util.Comparator;

import org.apache.commons.lang.builder.CompareToBuilder;

import com.bitsegment.domain.StudentFeePaid;

public class StudentFeePaidComparator implements Comparator<StudentFeePaid> {

	@Override
	public int compare(StudentFeePaid left, StudentFeePaid right) {
		return new CompareToBuilder().append(left.getFeeDate(), right.getFeeDate()).toComparison();
	}

}
