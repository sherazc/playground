package com.sc.jaxws;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jws.WebService;

import org.springframework.stereotype.Component;

import com.sc.business.Calculator;

@WebService(endpointInterface="com.sc.jaxws.MathService")
@Component("mathService")
public class MathServiceImpl implements MathService {

	@Inject
	@Named("calculator")
	private Calculator calculator;
	
	public int addNums(int num1, int num2) {
		return calculator.sum(num1, num2);
	}

}
