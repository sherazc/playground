package com.sc.spring3.services;

import org.springframework.stereotype.Component;

@Component("calculateService")
public class CalculateServiceImpl implements CalculateService {

	public int add(int num1, int num2) {
		return num1 + num2;
	}

}
