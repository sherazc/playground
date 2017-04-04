package com.sc.jaxws;

import javax.jws.WebService;

@WebService(endpointInterface="com.sc.jaxws.MathService")
public class MathServiceImpl implements MathService {

	public int addNums(int num1, int num2) {
		return num1 + num2;
	}

}
