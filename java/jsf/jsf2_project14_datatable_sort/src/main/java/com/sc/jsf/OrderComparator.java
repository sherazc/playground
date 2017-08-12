package com.sc.jsf;

import java.io.Serializable;
import java.util.Comparator;

public class OrderComparator implements Comparator<Order>, Serializable {

	private static final long serialVersionUID = 1L;

	private boolean sortAscending;

	public OrderComparator(boolean sortAscending) {
		this.sortAscending = sortAscending;
	}

	@Override
	public int compare(Order o1, Order o2) {
		if (sortAscending) {
			return o1.getOrderNo().compareTo(o2.getOrderNo());
		} else {
			return o2.getOrderNo().compareTo(o1.getOrderNo());
		}
	}
}
