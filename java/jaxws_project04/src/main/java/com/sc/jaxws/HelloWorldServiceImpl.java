package com.sc.jaxws;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jws.WebService;

import org.springframework.stereotype.Component;

import com.sc.business.WelcomeGuest;

@WebService (endpointInterface="com.sc.jaxws.HelloWorldService")
@Component("helloWorldService")
public class HelloWorldServiceImpl implements HelloWorldService {

	@Inject
	@Named("welcomeGuest")
	private WelcomeGuest welcomeGuest;
	
	public String sayHello(String name) {
		return welcomeGuest.welcome(name); 
	}
}
