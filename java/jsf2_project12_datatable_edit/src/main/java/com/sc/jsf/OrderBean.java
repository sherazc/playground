package com.sc.jsf;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "order")
@SessionScoped
public class OrderBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<Order> orderList;

	private String orderNo;
	private String productName;
	private BigDecimal price;
	private int quantity;

	public OrderBean() {
		orderList = new ArrayList<Order>(Arrays.asList(new Order[] {
				new Order("100", "Product 01", new BigDecimal(10.01), 10),
				new Order("200", "Product 02", new BigDecimal(20.02), 20),
				new Order("300", "Product 03", new BigDecimal(30.03), 30),
				new Order("400", "Product 04", new BigDecimal(40.04), 40),
				new Order("500", "Product 05", new BigDecimal(50.05), 50),
				new Order("600", "Product 06", new BigDecimal(60.06), 60),
				new Order("700", "Product 07", new BigDecimal(70.07), 70), }));
	}

	public List<Order> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}

	public String delete(Order order) {
		orderList.remove(order);
		return null;
	}

	public String edit(Order order) {
		order.setEditable(true);
		return null;
	}
	
	public String save() {
		for (Order order : orderList) {
			order.setEditable(false);
		}
		return null;
	}
	
	public String addOrder() {
		this.orderList.add(new Order(this.getOrderNo(), this.getProductName(),
				this.getPrice(), this.getQuantity()));
		return null;
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
