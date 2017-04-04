package com.sc.spring3.mvc.controller;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sc.spring3.mvc.domain.Customer;
import com.sc.spring3.mvc.service.StatusService;

@Controller
public class HomeController {

	@Inject
	@Named("statusService")
	private StatusService statusService;

	@RequestMapping({ "/", "/home" })
	public String showHomePage(Map<String, Object> model) {
		List<Customer> customers = statusService.getAllCustomers();
		model.put("customers", customers);
		return "home";
	}

	public StatusService getStatusService() {
		return statusService;
	}

	public void setStatusService(StatusService statusService) {
		this.statusService = statusService;
	}
}
