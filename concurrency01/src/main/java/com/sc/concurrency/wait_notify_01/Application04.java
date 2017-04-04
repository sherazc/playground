package com.sc.concurrency.wait_notify_01;

import java.util.LinkedList;

public class Application04 {

	public static void main(String[] args) {
		MyData myData = new MyData();
		final Producer04 producer04 = new Producer04(myData);
		final Consumer04 consumer04 = new Consumer04(myData);

		Thread threadA = new Thread() {
			public void run() {
				try {
					producer04.produce();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		Thread threadB = new Thread() {
			public void run() {
				try {
					consumer04.consume();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};

		threadA.start();
		threadB.start();
	}
}

class Producer04 {

	private MyData myData;

	public Producer04(MyData myData) {
		this.myData = myData;
	}

	public void produce() throws Exception {
		int value = 0;
		while (true) {

			synchronized (myData) {
				while (myData.getData().size() >= MyData.LIMIT_DATA) {
					myData.wait();
				}
				value++;
				myData.getData().add(value);
				System.out.print("Producing... List Size: " + myData.getData().size());
				System.out.println("; value is:  " + value);
				myData.notify();
				Thread.sleep(1000);
				if (value >= MyData.LIMIT_VALUE) {
					value = 0;
				}
			}
		}
	}
}

class Consumer04 {

	private MyData myData;

	public Consumer04(MyData myData) {
		this.myData = myData;
	}

	public void consume() throws Exception {
		while (true) {
			synchronized (myData) {
				while (myData.getData().size() < MyData.LIMIT_DATA) {

					myData.wait();
				}
				for (int i = 0; i < MyData.LIMIT_DATA; i++) {
					System.out.print("Consuming... List Size: " + myData.getData().size());
					int value = myData.getData().removeFirst();
					System.out.println("; value is: " + value);
					Thread.sleep(1000);
				}

				myData.notify();
			}

		}
	}
}

class MyData {

	public static final int LIMIT_DATA = 10;
	public static final int LIMIT_VALUE = 30;

	private boolean dataFull;
	private boolean dataEmpty;

	LinkedList<Integer> data = new LinkedList<Integer>();

	public boolean isDataFull() {
		return dataFull;
	}

	public void setDataFull(boolean dataFull) {
		this.dataFull = dataFull;
	}

	public boolean isDataEmpty() {
		return dataEmpty;
	}

	public void setDataEmpty(boolean dataEmpty) {
		this.dataEmpty = dataEmpty;
	}

	public LinkedList<Integer> getData() {
		return data;
	}

	public void setData(LinkedList<Integer> data) {
		this.data = data;
	}
}