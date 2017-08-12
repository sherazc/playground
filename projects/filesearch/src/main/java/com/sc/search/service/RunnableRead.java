package com.sc.search.service;

import com.sc.search.domain.FileSearchDetail;

public class RunnableRead implements Runnable {

	private FileSearchDetail fileSearchDetail;

	public RunnableRead(FileSearchDetail fileSearchDetail) {
		this.fileSearchDetail = fileSearchDetail;
	}

	public void run() {
		System.out.println("Read Start.");
		synchronized (fileSearchDetail) {
		while (!fileSearchDetail.reachedFileEnd()) {
			
				while (fileSearchDetail.haveEnoughSearchableData()) {
					try {
						fileSearchDetail.wait();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				while (!fileSearchDetail.reachedFileEnd() && !fileSearchDetail.haveEnoughSearchableData()) {
					fileSearchDetail.buildSearchableData();
				}
				fileSearchDetail.setSearchableReady(true);
				fileSearchDetail.notify();
			}
			fileSearchDetail.setReadProcessComplete(true);
		}
		System.out.println("Read complete.");
	}
}
