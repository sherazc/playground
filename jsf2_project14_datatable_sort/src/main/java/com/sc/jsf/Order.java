package com.sc.jsf;

import java.io.Serializable;
import java.math.BigDecimal;

public class Order implements Serializable {

	private static final long serialVersionUID = 1L;

	private String orderNo;
	private String productName;
	private BigDecimal price;
	private int qty;

	public Order(String orderNo, String productName, BigDecimal price, int qty) {
		this.orderNo = orderNo;
		this.productName = productName;
		this.price = price;
		this.qty = qty;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

}