package com.sc.spring3.mvc.dao;

import org.springframework.stereotype.Repository;

import com.sc.spring3.mvc.domain.Customer;

@Repository("customerDao")
public class CustomerDaoImpl extends BaseDaoImpl<Customer, Long> implements CustomerDao {

	public Class<Customer> getEntityClass() {
		return Customer.class;
	}
}
