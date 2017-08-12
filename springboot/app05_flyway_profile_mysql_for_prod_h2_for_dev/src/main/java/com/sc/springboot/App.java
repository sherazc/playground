package com.sc.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(App.class, args);
		for (String beanName : context.getBeanDefinitionNames()) {
			// System.out.println(beanName + " = " + context.getBean(beanName).getClass().getName());
		}

	}
}
