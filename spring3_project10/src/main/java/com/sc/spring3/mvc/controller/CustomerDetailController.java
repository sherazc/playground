package com.sc.spring3.mvc.controller;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sc.spring3.mvc.domain.Address;
import com.sc.spring3.mvc.domain.Customer;
import com.sc.spring3.mvc.service.CustomerService;

@Controller
@RequestMapping("/customerdetail")
public class CustomerDetailController {

	@Inject
	@Named("customerService")
	private CustomerService customerService;

	@RequestMapping("/edit")
	public String editCustomer(@RequestParam(value = "customerId", required = false) Long customerId, Model model) {
		Customer foundCustomer = customerService.getCustomerById(customerId);
		if (foundCustomer != null) {
			model.addAttribute(foundCustomer);
		}
		return "customer-detail";
	}

	@RequestMapping(method=RequestMethod.GET, params="register")
	public String createCustomer(Model model) {
		Customer customer = new Customer();
		customer.setAddress(new Address());
		model.addAttribute(customer);
		return "customer-register";
	}
}
