package com.sc.spring3;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class Stage implements ApplicationContextAware {

	private ApplicationContext context;
	
	private Stage() {
	}
	
	private static class StageSingletonHolder {
		static Stage instance = new Stage();
	}
	
	public static Stage getInstance() {
		return StageSingletonHolder.instance;
	}
	
	public void buildStage() {
		System.out.println("Stage contain context. " + context);
		System.out.println("Building stage...");
	}

	public void setApplicationContext(ApplicationContext context) throws BeansException {
		this.context = context;
	}
}
