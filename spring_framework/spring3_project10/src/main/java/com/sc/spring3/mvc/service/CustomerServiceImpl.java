package com.sc.spring3.mvc.service;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Component;

import com.sc.spring3.mvc.dao.CustomerDao;
import com.sc.spring3.mvc.domain.Customer;

@Component("customerService")
public class CustomerServiceImpl implements CustomerService {

	@Inject
	@Named("customerDao")
	private CustomerDao customerDao;

	public Customer getCustomerById(Long customerId) {
		if (customerId == null) {
			return null;
		}
		return customerDao.getById(customerId);
	}

}
