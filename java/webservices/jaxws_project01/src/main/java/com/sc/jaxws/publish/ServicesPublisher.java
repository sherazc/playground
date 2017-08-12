package com.sc.jaxws.publish;

import javax.xml.ws.Endpoint;

import com.sc.jaxws.HelloWorldServiceImpl;
import com.sc.jaxws.MathServiceImpl;

public class ServicesPublisher {

	public static void main(String[] args) {
		System.out.println("Published webservice: http://localhost:8080/ws/helloworld");
		Endpoint.publish("http://localhost:8080/ws/helloworld", new HelloWorldServiceImpl());
		System.out.println("Published webservice: http://localhost:8080/ws/math");
		Endpoint.publish("http://localhost:8080/ws/math", new MathServiceImpl());
	}
}
