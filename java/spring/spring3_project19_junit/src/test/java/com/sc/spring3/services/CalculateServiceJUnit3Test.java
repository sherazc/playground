package com.sc.spring3.services;

import javax.inject.Inject;
import javax.inject.Named;

import junit.framework.Assert;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit38.AbstractJUnit38SpringContextTests;

@ContextConfiguration(locations = { "classpath:/context.xml" })
public class CalculateServiceJUnit3Test extends AbstractJUnit38SpringContextTests {

	@Inject
	@Named("calculateService")
	private CalculateService calculateService;

	
	@Override
	protected void setUp() throws Exception {
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
