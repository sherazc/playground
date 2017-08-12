package com.sc.app;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

@Component("main")
public class Main {

	public static void main(String[] args) {
		ApplicationContext context = loadApplicationContext();
		Main main = (Main) context.getBean("main");
		main.run();
	}
	
	public void run() {
		System.out.println("Testing");
	}
	
	private static ApplicationContext loadApplicationContext() {
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "context.xml" });
		return context;
	}
}
