package com.sc.concurrency.wait_notify_01;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Application02 {
	public static final int LIMIT = 4;

	public static void main(String[] args) {
		List<Integer> data = new ArrayList<Integer>();
		final Producer02 producer02 = new Producer02(data);
		final Consumer02 consumer02 = new Consumer02(data);

		Thread threadA = new Thread() {
			public void run() {
				try {
					producer02.produce();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		Thread threadB = new Thread() {
			public void run() {
				try {
					consumer02.consume();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		threadA.start();
		threadB.start();
	}
}

class Producer02 {

	private List<Integer> data;

	public Producer02(List<Integer> data) {
		this.data = data;
	}

	public void produce() throws Exception {
		synchronized (data) {
			System.out.println("Producer is running...");
			data.wait();

			System.out.println("Producer finished.");
		}

	}
}

class Consumer02 {

	private List<Integer> data;

	public Consumer02(List<Integer> data) {
		this.data = data;
	}

	public void consume() throws Exception {
		Scanner scanner = new Scanner(System.in);
		Thread.sleep(2000);
		synchronized (data) {
			System.out.print("Press enter key:");
			scanner.nextLine();
			System.out.println("Enter Pressed");
			data.notify();

		}
		scanner.close();
	}
}
