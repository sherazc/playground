package com.sc.jaxws;

import javax.jws.WebService;

@WebService (endpointInterface="com.sc.jaxws.HelloWorldService")
public class HelloWorldServiceImpl implements HelloWorldService {

	public String sayHello(String name) {
		return "JAX-WS Hello " + name; 
	}
}
