package com.sc.nio2;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio19FilterDirectoryGlobbing {
	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		for (int i = 0; i < 100; i++) {
			String filename = "file_" + i + ".";
			if (i % 6 == 0) {
				filename += "java";
			} else if (i % 5 == 0) {
				filename += "doc";
			} else if (i % 4 == 0) {
				filename += "log";
			} else if (i % 3 == 0) {
				filename += "txt";
			} else if (i % 2 == 0) {
				filename += "xls";
			} else {
				filename += "jpg";
			}
			MyFileUtils.createFile("./in/" + filename, "File " + i);
		}

		Path workDirectory = Paths.get("./in");

		System.out.println("L");
		try (DirectoryStream<Path> stream = Files.newDirectoryStream(workDirectory, "*.{java,log,txt}")) {
			for (Path filePath : stream) {
				System.out.println(filePath.getFileName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
