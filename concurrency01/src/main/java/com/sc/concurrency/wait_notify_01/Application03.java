package com.sc.concurrency.wait_notify_01;

import java.util.LinkedList;

public class Application03 {

	public static void main(String[] args) {
		LinkedList<Integer> data = new LinkedList<Integer>();
		final Producer03 producer03 = new Producer03(data);
		final Consumer03 consumer03 = new Consumer03(data);

		Thread threadA = new Thread() {
			public void run() {
				try {
					producer03.produce();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		Thread threadB = new Thread() {
			public void run() {
				try {
					consumer03.consume();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		threadA.start();
		threadB.start();
	}
}

class Producer03 {

	private LinkedList<Integer> data;
	private static final int LIMIT = 10;

	public Producer03(LinkedList<Integer> data) {
		this.data = data;
	}

	public void produce() throws Exception {
		int value = 0;
		while (true) {
			synchronized (data) {
				while (data.size() >= LIMIT) {
					data.wait();
				}
				data.add(value++);
				data.notify();
			}
		}
	}
}

class Consumer03 {

	private LinkedList<Integer> data;

	public Consumer03(LinkedList<Integer> data) {
		this.data = data;
	}

	public void consume() throws Exception {
		while (true) {
			synchronized (data) {
				while (data.size() < 1) {
					System.out.println("Consumer waiting");
					data.wait();
				}

				System.out.print("list size is: " + data.size());
				int value = data.removeFirst();
				System.out.println("; value is: " + value);

				data.notify();
			}
			Thread.sleep(1000);
		}
	}
}
