package com.sc.gae.server;

import org.springframework.stereotype.Repository;

import com.sc.gae.model.Customer;

@Repository("customerDao")
public class CustomerDaoImpl extends BaseDaoImpl<Customer, Long> implements CustomerDao {

	public Class<Customer> getEntityClass() {
		return Customer.class;
	}
}
