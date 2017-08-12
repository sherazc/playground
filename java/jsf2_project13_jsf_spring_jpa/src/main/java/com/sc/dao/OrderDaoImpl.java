package com.sc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sc.domain.Order;

@Repository("orderDao")
public class OrderDaoImpl extends BaseDaoImpl<Order, Long> implements OrderDao {

	private static final long serialVersionUID = 1L;

	public Class<Order> getEntityClass() {
		return Order.class;
	}

	@SuppressWarnings("unchecked")
	public List<Order> getAllOrder() {
		return getEm().createNamedQuery("allOrders").getResultList();
	}
}
