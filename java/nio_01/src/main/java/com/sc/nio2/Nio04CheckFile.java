package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio04CheckFile {

	// http://docs.oracle.com/javase/tutorial/essential/io/check.html

	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		MyFileUtils.createFile("./in/myfile01.txt", "Test content");
		MyFileUtils.createDirectory("./in/testdir");
		
		Path pathExists = Paths.get("./in/myfile01.txt");
		Path pathNotExists = Paths.get("./in/myfile02.txt");
		Path pathTestDir = Paths.get("./in/testdir");

		checkFile(pathExists);
		checkFile(pathNotExists);
		checkFile(pathTestDir);
	}

	private static void checkFile(Path path) {
		try {
			System.out.println("#################");
			System.out.format("Checking: %s%n", path.toAbsolutePath());
			if (Files.exists(path)) {
				System.out.format("Exists: %s%n", path.toAbsolutePath());
				System.out.format("Regular: %b%n", Files.isRegularFile(path));
				System.out.format("Link: %b%n", Files.isSymbolicLink(path));
				System.out.format("Readable: %b%n", Files.isReadable(path));
				System.out.format("Writeable: %b%n", Files.isWritable(path));
				System.out.format("Executable: %b%n", Files.isExecutable(path));
				System.out.format("Directory: %b%n", Files.isDirectory(path));
				System.out.format("Hidden: %b%n", Files.isHidden(path));
			} else {
				System.out.format("File do not exists: %s%n", path.toAbsolutePath());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
