package com.sc.concurrency.wait_notify_01;

import java.util.ArrayList;
import java.util.List;

public class Application01 {
	public static final int LIMIT = 4;

	public static void main(String[] args) {
		List<Integer> data = new ArrayList<Integer>();
		final Producer01 producer01 = new Producer01(data);
		final Consumer01 consumer01 = new Consumer01(data);

		Thread thread01 = new Thread() {
			public void run() {
				try {
					producer01.produce();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		Thread thread02 = new Thread() {
			public void run() {
				try {
					consumer01.consume();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		thread01.start();
		thread02.start();
	}
}

class Producer01 {

	private List<Integer> data;

	public Producer01(List<Integer> data) {
		this.data = data;
	}

	public void produce() throws Exception {
		while (true) {
			synchronized (data) {
				int number = data.size();
				for (int i = 0; i < Application01.LIMIT; i++) {
					++number;

					System.out.println("Produce: " + number);
					data.add(number);
					Thread.sleep(1000);
				}
				if (data.size() >= Application01.LIMIT) {
					data.notify();
					data.wait();
				}
				
			}
		}
	}
}

class Consumer01 {

	private List<Integer> data;

	public Consumer01(List<Integer> data) {
		this.data = data;
	}

	public void consume() throws Exception {
		while (true) {
			synchronized (data) {
				if (data.size() < Application01.LIMIT) {
					data.notify();
					data.wait();
				}
				for (int i = 0; i < data.size(); i++) {
					int number = data.remove(i);
					System.out.println("Consume: " + number);
					Thread.sleep(1000);
				}
			}
		}
	}
}