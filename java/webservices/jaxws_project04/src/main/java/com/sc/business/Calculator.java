package com.sc.business;

import org.springframework.stereotype.Component;

@Component("calculator")
public class Calculator {

	public int sum(int... nums) {
		int result = 0;
		for (int i : nums) {
			result += i;
		}
		return result;
	}
}
