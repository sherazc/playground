package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio07ManagingMetadata {

	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		MyFileUtils.createFile("./in/file01.txt", "Some content in the file.");
		Path file01Path = Paths.get("./in/file01.txt");
		
		// Files.size() throws Exception if file does not exists.
		System.out.format("file01.txt size %s bytes.%n", Files.size(file01Path));
		System.out.format("file01.txt Last modified time %s%n", Files.getLastModifiedTime(file01Path));
		System.out.format("file01.txt owner %s%n", Files.getOwner(file01Path));
		
	}
}
