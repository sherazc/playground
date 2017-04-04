package com.bitsegment.services;

public enum PaidType {
	all, paid, unpaid;

	public static PaidType fromValue(String value) {
		PaidType paidTypeResult = null;

		for (PaidType paidType : PaidType.values()) {
			if (value != null && paidType.toString().equalsIgnoreCase(value.trim())) {
				paidTypeResult = paidType;
				break;
			}
		}
		return paidTypeResult == null ? PaidType.all : paidTypeResult;
	}
}
