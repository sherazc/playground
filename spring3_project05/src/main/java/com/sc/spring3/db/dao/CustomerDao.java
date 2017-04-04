package com.sc.spring3.db.dao;

import java.util.Map;

import com.sc.spring3.db.domain.Customer;

public class CustomerDao extends BaseDao<Customer> {

	public String getAllQuery() {
		return "select id, name, email, salary, location from customer";
	}

	@Override
	public Customer rowToAddress(Map<String, Object> row) {
		// TODO Auto-generated method stub
		return null;
	}

}
