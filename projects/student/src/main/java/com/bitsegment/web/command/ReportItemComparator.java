package com.bitsegment.web.command;

import java.util.Comparator;

import org.apache.commons.lang.builder.CompareToBuilder;

public class ReportItemComparator implements Comparator<ReportItem> {

	@Override
	public int compare(ReportItem left, ReportItem right) {
		return new CompareToBuilder().append(left.getIndex(), right.getIndex()).toComparison();
	}
}
