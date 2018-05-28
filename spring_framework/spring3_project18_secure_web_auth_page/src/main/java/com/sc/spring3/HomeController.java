package com.sc.spring3;

import java.security.Principal;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

	@RequestMapping({"/" })
	public String redirectHome(Map<String, Object> model, Principal principal) {
		return "redirect:home";
	}
	
	@RequestMapping({"/home" })
	public String showHomePage(Map<String, Object> model, Principal principal) {
		if (principal != null) {
			model.put("username", principal.getName());
		}
		return "home";
	}
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(Map<String, Object> model) {
		return "login";
	}

	@RequestMapping(value="/loginfailed", method=RequestMethod.GET)
	public String loginfailed(Map<String, Object> model) {
		model.put("error", "true");
		return "login";
	}
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(Map<String, Object> model) {
		return "login";
	}
}
