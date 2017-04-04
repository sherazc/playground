package com.sc.controller;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class LoadSystem extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		System.out.println("Loading System...");
		System.setProperty("com.sun.management.jmxremote.port", "1234");
		System.setProperty("com.sun.management.jmxremote.ssl", "false");
		System.setProperty("com.sun.management.jmxremote.authenticate", "false");
		config.getServletContext().setAttribute("abc", "ABC");
	}
}
