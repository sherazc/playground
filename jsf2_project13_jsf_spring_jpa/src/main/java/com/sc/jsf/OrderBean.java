package com.sc.jsf;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;

import com.sc.dao.OrderDao;
import com.sc.domain.Order;

@ManagedBean(name = "order")
@SessionScoped
public class OrderBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String orderNo;
	private String productName;
	private BigDecimal price;
	private int quantity;
	private List<Order> orderList;
	private boolean reloadOrders;

	@ManagedProperty("#{orderDao}")
	private OrderDao orderDao;

	public OrderBean() {
	}

	public List<Order> getOrderList() {
		if (reloadOrders || orderList == null) {
			orderList = orderDao.getAllOrder();
			reloadOrders = false;
		}
		return orderList;
	}

	public String delete(Order order) {
		if (order != null && order.getId() != null) {
			orderDao.removeById(order.getId());
			reloadOrders = true;
		}
		return null;
	}

	public String addOrder() {
		this.orderDao.save(new Order(null, this.getOrderNo(), this
				.getProductName(), this.getPrice(), this.getQuantity()));
		reloadOrders = true;
		return null;
	}

	public String edit(Order order) {
		order.setEditable(true);
		return null;
	}

	public String save() {
		for (Order order : orderList) {
			if (order.isEditable()) {
				this.orderDao.save(order);
				order.setEditable(false);
			}
		}
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

	public OrderDao getOrderDao() {
		return orderDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}
}
