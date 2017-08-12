package com.sc.nio2;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class Nio03VarargsMove {

	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		File sourceFile = new File("./in/source_file.txt");
		if (!sourceFile.exists()) {
			sourceFile.createNewFile();
		}

		Path source = Paths.get("./in/source_file.txt");
		Path target = Paths.get("./out/target_file.txt");
		
		System.out.println("Moving " + source + " to " + target);
		
		Files.move(source, target, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
		
		System.out.println("Moved!");
	}
}
