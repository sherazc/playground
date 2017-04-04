package com.sc.spring3.mvc.service;

import com.sc.spring3.mvc.domain.Customer;

public interface CustomerService {
	Customer getCustomerById(Long customerId);
}
