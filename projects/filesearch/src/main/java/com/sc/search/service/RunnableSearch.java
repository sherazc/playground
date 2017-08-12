package com.sc.search.service;

import com.sc.search.domain.FileSearchDetail;

public class RunnableSearch implements Runnable {

	private FileSearchDetail fileSearchDetail;

	public RunnableSearch(FileSearchDetail fileSearchDetail) {
		super();
		this.fileSearchDetail = fileSearchDetail;
	}

	@Override
	public void run() {
		System.out.println("Search Start");
		synchronized (fileSearchDetail) {
			while (!fileSearchDetail.isReadProcessComplete() || fileSearchDetail.isSearchableReady()) {
				while (!fileSearchDetail.isSearchableReady()) {
					try {

						fileSearchDetail.wait();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}

				System.out.println("Searching: " + fileSearchDetail.getCurrentSearchable());

				fileSearchDetail.resetSearchableData();

				fileSearchDetail.notify();
			}
		}
		System.out.println("Search Complete.");
	}
}
