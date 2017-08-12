package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio16CreateDirectory {

	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		Path directoryPath = Paths.get("./in/dir1");
		Files.createDirectory(directoryPath);
		System.out.println("Directories created: " + directoryPath);

		Path directoriesPath = Paths.get("./in/dir1/dir2/dir3/dir4/dir5");
		Files.createDirectories(directoriesPath);
		System.out.println("Directories created: " + directoriesPath);
		System.out.println("Exists: " + Files.exists(directoriesPath) + " " + directoriesPath);
		
		Path temporaryDirectory = Files.createTempDirectory("temp1_");
		System.out.println("Created temporary directory: " + temporaryDirectory.toAbsolutePath());
		
		Path temporaryDirectory2 = Files.createTempDirectory(temporaryDirectory,"temp2_");
		System.out.println("Created temporary directory2: " + temporaryDirectory2.toAbsolutePath());
		
		System.out.println("Creating directory inside temporary directory");
		Path temporaryDirectory3 = Paths.get(temporaryDirectory2.toAbsolutePath() + "/temp3_");
		Files.createDirectories(temporaryDirectory3);
		System.out.println("Created temporary directory3: " + temporaryDirectory3.toAbsolutePath());
		
		System.out.println("Exists: " + Files.exists(temporaryDirectory3) + " " + temporaryDirectory3.toAbsolutePath());
	}
}
