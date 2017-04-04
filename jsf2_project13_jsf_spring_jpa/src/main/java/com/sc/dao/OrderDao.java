package com.sc.dao;

import java.util.List;

import com.sc.domain.Order;

public interface OrderDao extends BaseDao<Order, Long>{

	List<Order> getAllOrder() ;
}
