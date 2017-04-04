package com.sc.nio2;

import java.nio.file.FileSystems;
import java.nio.file.Path;

public class Nio15RootDirectories {

	public static void main(String[] args) {
		// in case of windows it displays all drives
		Iterable<Path> directories = FileSystems.getDefault().getRootDirectories();
		for (Path directory : directories) {
			System.out.println(directory);
		}
		
	}
}
