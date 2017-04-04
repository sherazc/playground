package com.sc.spring3.mvc.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.sc.spring3.mvc.domain.Customer;
import com.sc.spring3.mvc.service.StatusService;

public class HomeControllerTest {

	private HomeController homeController;

	@Before
	public void setup() {
		homeController = new HomeController();
	}

	@Test
	public void testShowHomePage() {
		List<Customer> customers = Arrays.asList(new Customer(), new Customer());
		StatusService statusService = Mockito.mock(StatusService.class);
		Mockito.when(statusService.getAllCustomers()).thenReturn(customers);

		homeController.setStatusService(statusService);

		Map<String, Object> model = new HashMap<String, Object>();

		String viewName = homeController.showHomePage(model);

		assert "home".equals(viewName);
		Assert.assertSame(customers, model.get("customers"));

		Mockito.verify(statusService).getAllCustomers();
	}
}
