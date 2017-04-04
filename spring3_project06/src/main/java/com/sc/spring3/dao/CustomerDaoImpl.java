package com.sc.spring3.dao;

import org.springframework.stereotype.Repository;

import com.sc.spring3.domain.Customer;

@Repository("customerDao")
public class CustomerDaoImpl extends BaseDaoImpl<Customer, Long> implements CustomerDao {

	public Class<Customer> getEntityClass() {
		return Customer.class;
	}
}
