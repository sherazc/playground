package com.sc.spring3.mvc.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Component;

import com.sc.spring3.mvc.dao.CustomerDao;
import com.sc.spring3.mvc.domain.Customer;

@Component("statusService")
public class StatusServiceImpl implements StatusService {

	@Inject
	@Named("customerDao")
	private CustomerDao customerDao;
	
	
	public List<Customer> getAllCustomers() {
		return customerDao.getAll();
	}
}
