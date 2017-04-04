package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class Nio05CopyFiles {

	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		MyFileUtils.createDirectory("./in/mydir/");
		MyFileUtils.createFile("./in/mydir/file01.txt", "My File 01 Content");
		MyFileUtils.createFile("./in/mydir/file03.txt", "My File 03 Content");
		MyFileUtils.createDirectory("./out/mydir/");

		// Work on merging directories
		// MyFileUtils.createFile("./out/mydir/file02.txt",
		// "My File 02 Content");
		// MyFileUtils.createFile("./out/mydir/file03.txt",
		// "My File 03 Duplicated Content");

		try {
			Path source = Paths.get("./in/mydir/");
			Path target = Paths.get("./out/mydir/");
			// this merges directory perfectly
			//FileUtils.copyDirectory(source.toFile(), target.toFile());
			Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.COPY_ATTRIBUTES);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
