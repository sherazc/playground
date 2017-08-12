package com.sc.spring3.utils;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanUtils {

	private static ApplicationContext context;

	private BeanUtils() {
	}

	private static ApplicationContext getContext() {
		if (context == null) {
			context = new ClassPathXmlApplicationContext("knights.xml", "spring-el-context.xml");
		}
		return context;
	}

	public static Object getBean(String beanName) {
		return BeanUtils.getContext().getBean(beanName);
	}
}
