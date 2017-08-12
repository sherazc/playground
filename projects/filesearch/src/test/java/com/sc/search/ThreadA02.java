package com.sc.search;

public class ThreadA02 {
	public static void main(String[] args) {
		ThreadB02 b = new ThreadB02();
		b.start();
 
		System.out.println("Total is: " + b.total);
 
	}
}
 
class ThreadB02 extends Thread {
	int total;
 
	@Override
	public void run() {
		for (int i = 0; i < 100; i++) {
			total += i;
		}
	}
}