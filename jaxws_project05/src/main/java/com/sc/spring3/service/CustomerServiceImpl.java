package com.sc.spring3.service;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.sc.spring3.dao.CustomerDao;
import com.sc.spring3.domain.Customer;

@Component("customerService")
public class CustomerServiceImpl implements CustomerService {

	@Inject
	@Named("customerDao")
	private CustomerDao customerDao;

	@Transactional
	public Customer getCustomerById(Long customerId) {
		if (customerId == null) {
			return null;
		}
		Customer customer = customerDao.getById(customerId);
		this.loadLazyObjects(customer);
		return customer;
	}

	@Transactional
	public Customer createOrUpdateCustomer(Customer customer) {
		if (customer == null) {
			return null;
		}
		Customer savedCustomer = customerDao.save(customer);
		this.loadLazyObjects(savedCustomer);
		return savedCustomer;
	}

	@Transactional
	public void deleteCustomer(Long id) {
		if (id != null) {
			customerDao.removeById(id);
		}
	}
	
	private void loadLazyObjects(Customer customer) {
		if (customer != null) {
			customer.getAddress();
		}
	}
}
