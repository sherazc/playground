package com.sc.jsf;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "order")
@SessionScoped
public class OrderBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<Order> orders;

	private boolean sortAscending = false;

	private static final Order[] orderList = { new Order("A001", "Order 001", new BigDecimal("100"), 1),
			new Order("A002", "Order 002", new BigDecimal("200"), 2),
			new Order("A003", "Order 003", new BigDecimal("300"), 3),
			new Order("A004", "Order 004", new BigDecimal("400"), 4),
			new Order("A005", "Order 005", new BigDecimal("500"), 5),
			new Order("A006", "Order 006", new BigDecimal("600"), 6), };

	public OrderBean() {
		orders = new ArrayList<Order>(Arrays.asList(orderList));
	}

	public String sortByOrderNo() {
		if (sortAscending) {
			Collections.sort(orders, new OrderComparator(true));
			sortAscending = false;
		} else {
			Collections.sort(orders, new OrderComparator(false));
			sortAscending = true;
		}
		return null;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
}
