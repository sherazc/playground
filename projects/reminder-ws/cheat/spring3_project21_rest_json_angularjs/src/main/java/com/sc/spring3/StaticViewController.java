package com.sc.spring3;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/static")
public class StaticViewController {

	@RequestMapping("/**")
	public String goToRequestUri(HttpServletRequest request) {
		String requestUri = request.getRequestURI();
		String view = StringUtils.substringAfter(requestUri, "static/");
		if (StringUtils.isBlank(view)) {
			view = "home";
		} 
		return view;
	}
	
//	@RequestMapping("/{viewName}")
//	public String goToView(@PathVariable("viewName") String viewName) {
//		String view = null;
//		if (StringUtils.isBlank(viewName)) {
//			view = "home";
//		} else {
//			view = viewName;
//		} 
//		
//		return view;
//	}
}
