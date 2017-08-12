package com.sc.gae;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping({ "/", "/home" })
	public String showHomePage(Map<String, Object> model) {
		return "home";
	}
	
	@RequestMapping({"/logout" })
	public String logoutPage(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) {
		//request.getSession().invalidate();
		System.out.println("Simple logout");
		//eraseCookie(request, response);
		return "logout";
	}
	
//	private void eraseCookie(HttpServletRequest request, HttpServletResponse response) {
//	    Cookie[] cookies = request.getCookies();
//	    if (cookies != null)
//	        for (int i = 0; i < cookies.length; i++) {
//	            cookies[i].setValue("");
//	            cookies[i].setPath("/");
//	            cookies[i].setMaxAge(-1);
//	            response.addCookie(cookies[i]);
//	        }
//	}
}
