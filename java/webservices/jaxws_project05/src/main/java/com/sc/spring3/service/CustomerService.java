package com.sc.spring3.service;

import com.sc.spring3.domain.Customer;

public interface CustomerService {
	Customer getCustomerById(Long customerId);

	Customer createOrUpdateCustomer(Customer customer);

	void deleteCustomer(Long id);
}
