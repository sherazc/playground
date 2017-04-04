package com.sc.spring3.aop;

public class Drummer implements Performer {

	public void perform(int count) {
		if (count  < 1) {
			throw new RuntimeException("Can not perform less then one time.");
		}
		for (int i = 1; i <= count; i++) {
			System.out.println("Druming: " + i);
		}
	}
}
