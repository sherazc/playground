package com.sc.bsp.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping({"/login" })
	public String showLoginPage(Map<String, Object> model) {
		return "login";
	}

	@RequestMapping({ "/data" })
	public String showDataPage(Map<String, Object> model) {
		return "data";
	}
}
