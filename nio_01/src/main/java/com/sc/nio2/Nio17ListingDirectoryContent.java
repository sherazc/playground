package com.sc.nio2;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio17ListingDirectoryContent {

	public static void main(String[] args) {
		Path myWorkingDirectory = Paths.get(".");
		try (DirectoryStream<Path> stream = Files.newDirectoryStream(myWorkingDirectory)) {
			for (Path path : stream) {
				System.out.println(path.getFileName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
