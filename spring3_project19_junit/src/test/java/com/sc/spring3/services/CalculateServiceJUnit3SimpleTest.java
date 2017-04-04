package com.sc.spring3.services;

import junit.framework.Assert;
import junit.framework.TestCase;

import com.sc.spring3.utils.BeanUtils;

public class CalculateServiceJUnit3SimpleTest extends TestCase {

	private CalculateService calculateService;

	@Override
	protected void setUp() throws Exception {
		this.calculateService = (CalculateService) BeanUtils.getBean("calculateService");
		System.out.println("Initializing unit test");
	}

	public void testAddFunction() {
		int num1 = 2;
		int num2 = 4;
		int result = calculateService.add(num1, num2);

		Assert.assertEquals(6, result);
		System.out.println("checkAddFunction() test complete");
	}

	@Override
	protected void tearDown() throws Exception {
		System.out.println("Distroying Unit Test");
	}
}
