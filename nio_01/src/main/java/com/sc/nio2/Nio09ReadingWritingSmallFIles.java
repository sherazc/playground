package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio09ReadingWritingSmallFIles {

	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		byte[] contentBuffer = "This is some content".getBytes();

		Path testFile = Paths.get("./in/testfile01.txt");
		Files.write(testFile, contentBuffer);
		System.out.println("File written.");

		System.out.println("Reading file...");
		byte[] contentBufferRead = Files.readAllBytes(testFile);
		System.out.println("File content=" + new String(contentBufferRead));
	}
}
