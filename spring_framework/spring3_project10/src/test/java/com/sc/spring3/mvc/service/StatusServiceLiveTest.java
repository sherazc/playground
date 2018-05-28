package com.sc.spring3.mvc.service;

import com.sc.spring3.mvc.domain.Customer;
import com.sc.spring3.mvc.utils.BeanUtils;

public class StatusServiceLiveTest {

	public static void main(String[] args) {
		StatusService statusService = (StatusService) BeanUtils.getBean("statusService");
		System.out.println(statusService);
		for (Customer customer : statusService.getAllCustomers()) {
			System.out.println(customer);
		}
		
		
	}
}
