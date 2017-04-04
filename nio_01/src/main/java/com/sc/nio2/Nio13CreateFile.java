package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio13CreateFile {
	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		Path path = Paths.get("./in/myworkfile.txt");
		Path createdFile = Files.createFile(path);
		System.out
				.println("File created. " + createdFile.toAbsolutePath() + " Exists=" + createdFile.toFile().exists());

		Path createdTempFile = Files.createTempFile("test", ".txt");
		System.out.println("File created. " + createdTempFile.toAbsolutePath() + " Exists="
				+ createdTempFile.toFile().exists());
	}
}
