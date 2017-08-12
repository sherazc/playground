package com.sc.search.process;

import com.sc.search.service.SearchFile;
import com.sc.search.util.MyFileUtils;

public class Application {
	public static void main(String[] args) {

		MyFileUtils.cleanCache();
		String workingFileName = "./in/working_file_01.txt";
		//String fileDataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890 abcdefghijklmnopqrstuvwxyz.";
		String fileDataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890 abcdefghijklmnopqrstuvwxyz.";
		String searchString = "56";
		MyFileUtils.createFile(workingFileName, fileDataString);
		System.out.println("Search string: " + searchString);
		
		System.out.println("#################");
		SearchFile searchFile = new SearchFile();
		for (int i=0; i < 100; i++) {
			searchFile.search(workingFileName, searchString);
			if (searchString == null || searchString.length() < 1) {
				System.out.println("This is bad.");
			}
			System.out.println("=================");
		}
		System.out.println("Application Done.");
	}
}
