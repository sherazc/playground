package com.sc.spring3.mvc.utils;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanUtils {

	private static ApplicationContext context;

	private BeanUtils() {
	}

	private static ApplicationContext getContext() {
		if (context == null) {
			context = new ClassPathXmlApplicationContext("context.xml");
		}
		return context;
	}

	public static Object getBean(String beanName) {
		return BeanUtils.getContext().getBean(beanName);
	}
}
