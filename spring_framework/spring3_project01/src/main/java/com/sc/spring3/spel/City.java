package com.sc.spring3.spel;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.core.style.ToStringCreator;

public class City {
	private String name;
	private String state;
	private int population;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
