package com.sc.search.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import com.sc.search.domain.FileSearchDetail;

public class SearchFile {

	private static final int SEARCH_FILE_TIMEOUT = 30 * 1000;

	public SearchFile() {
	}

	public FileSearchDetail search(String file, String searchString) {
		if (searchString == null || searchString.length() < 1) {
			return null;
		}
		FileSearchDetail fileSearchDetail = null;

		try {
			fileSearchDetail = new FileSearchDetail(file, searchString);
			if (fileSearchDetail.getFileSize() < 1) {
				return null;
			}
			RunnableRead runnableRead = new RunnableRead(fileSearchDetail);
			RunnableSearch runnableSearch = new RunnableSearch(fileSearchDetail);

			ExecutorService executorService = Executors.newCachedThreadPool();
			executorService.execute(runnableRead);
			executorService.execute(runnableSearch);
			executorService.shutdown();
			try {
				executorService.awaitTermination(SEARCH_FILE_TIMEOUT, TimeUnit.HOURS);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally {
			if (fileSearchDetail != null && fileSearchDetail.isChannelOpen()) {
				try {
					System.out.println("Closing Channel...");
					fileSearchDetail.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return fileSearchDetail;
	}
}
