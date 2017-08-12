package com.bitsegment.web.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("authenticationController")

public class AuthenticationController {

	@RequestMapping("/login")
	public String login(Map<String, Object> model) {
		return "login";
	}
	
	@RequestMapping("/loginfailed")
	public String loginfailed(Map<String, Object> model) {
		model.put("error", "true");
		return "login";
	}
}
