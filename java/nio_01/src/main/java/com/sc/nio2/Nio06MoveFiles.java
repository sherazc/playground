package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

// http://docs.oracle.com/javase/tutorial/essential/io/move.html
public class Nio06MoveFiles {

	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		MyFileUtils.createDirectory("./in/source/");
		MyFileUtils.createFile("./in/source/file01.txt", "My File 01 Content");
		MyFileUtils.createFile("./in/source/file03.txt", "My File 03 Content");
		// This directory will be replaced. Target directory should be empty
		MyFileUtils.createDirectory("./out/target/");
		MyFileUtils.createFile("./out/target/file02.txt", "My File 02 Content");

		try {
			Path source = Paths.get("./in/source/");
			Path target = Paths.get("./out/target/");
			// target folder already exists but
			// StandardCopyOption.REPLACE_EXISTING replaces it.
			Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
