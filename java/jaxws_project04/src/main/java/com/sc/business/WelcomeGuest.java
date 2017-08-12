package com.sc.business;
import org.springframework.stereotype.Component;

@Component("welcomeGuest")
public class WelcomeGuest {

	public String welcome(String guestName) {
		return "Welcome " + guestName + " I am your host service.";
	}
}
