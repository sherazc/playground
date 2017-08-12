package com.sc.spring3.services;

import javax.inject.Inject;
import javax.inject.Named;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/context.xml" })
public class CalculateServiceJUnit4Test {

	@Inject
	@Named("calculateService")
	private CalculateService calculateService;

	@Before
	public void initUnitTest() {
		System.out.println("Initializing unit test");
	}
	
	@Test
	public void checkAddFunction() {
		int num1 = 2;
		int num2 = 4;
		int result = calculateService.add(num1, num2);

		assert result == 6;
		System.out.println("checkAddFunction() test complete");
	}
	
	@After
	public void distroyUnitTest() {
		System.out.println("Distroying Unit Test");
	}

}
