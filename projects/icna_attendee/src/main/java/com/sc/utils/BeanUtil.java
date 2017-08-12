package com.sc.utils;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanUtil {

	private static ApplicationContext context;

	private static ApplicationContext testContext;
 
	
	private static ApplicationContext getContext() {
		if (context == null) {
			context = new ClassPathXmlApplicationContext("context.xml");
		}
		return context;
	}

	private static ApplicationContext getTestContext() {
		if (testContext == null) {
			testContext = new ClassPathXmlApplicationContext("test-context.xml");
		}
		return testContext;
	}
	
	public static Object getBean(String beanName) {
		return BeanUtil.getContext().getBean(beanName);
	}

	public static Object getTestBean(String beanName) {
		return BeanUtil.getTestContext().getBean(beanName);
	}
}
