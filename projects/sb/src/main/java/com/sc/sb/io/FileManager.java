package com.sc.sb.io;

import java.io.File;
import java.io.FilenameFilter;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;

@Component("fileManager")
public class FileManager {

	public static final String PDF = "pdf";
	public static final String TXT = "txt";

	public File[] getAllFiles(String sourceDirectory, final String fileType) {
		File directorySource = new File(sourceDirectory);

		File[] files = directorySource.listFiles(new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return (name.toLowerCase().endsWith("." + fileType));
			}
		});

		return files;
	}

	public File cleanDirectory(String directoryPath) {
		System.out.println("Cleaning directory");
		File directory = new File(directoryPath);
		deleteDirectory(directoryPath);

		boolean created = directory.mkdir();

		if (created) {
			return directory;
		} else {
			return null;
		}
	}

	public void deleteDirectory(String filePath) {
		FileUtils.deleteQuietly(new File(filePath));
	}
}
