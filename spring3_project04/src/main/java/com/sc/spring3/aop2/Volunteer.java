package com.sc.spring3.aop2;

public class Volunteer implements Thinker {
	private String thoughts;

	public void thinkOfSomething(String thoughts) {
		System.out.println("Volunteer is thinking of: " + thoughts);
		this.thoughts = thoughts;
	}

	public String getThoughts() {
		return thoughts;
	}
}
