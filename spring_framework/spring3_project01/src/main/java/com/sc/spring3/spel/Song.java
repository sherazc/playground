package com.sc.spring3.spel;

import java.util.Properties;

import org.springframework.beans.factory.BeanNameAware;

public class Song implements BeanNameAware {
	private String beanName;
	private Properties instruments;

	public Properties getInstruments() {
		return instruments;
	}

	public void setInstruments(Properties instruments) {
		this.instruments = instruments;
	}

	public void playSong() {
		System.out.println("=========================");
		System.out.println(this.beanName + " is playing.");
		if (this.instruments != null) {
			for (String key : this.instruments.stringPropertyNames()) {
				System.out.println("Playing " + key + " = " + this.instruments.getProperty(key));
			}
		}
	}

	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}
}