package com.sc.nio2;

import java.io.IOException;
import java.net.URI;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio01Path {

	
	public static void main(String[] args) throws IOException {
		MyFileUtils.cleanCache();
		Path p1 = Paths.get("./in");
		System.out.println(p1.toFile().exists());
		
		Path p2 = Paths.get(URI.create("file:///tmp"));
		System.out.println("To File and exists=" + p2.toFile().exists());
		
		Path p3 = FileSystems.getDefault().getPath("./in");
		System.out.println(p3.toFile().exists());
		
		Path p4 = Paths.get(System.getProperty("user.home"));
		System.out.println(p4.toAbsolutePath());
		System.out.println("number of names in user home=" + p4.getNameCount());
		System.out.println("Name 0=" + p4.getName(0));
		
		Path p5 = Paths.get(System.getProperty("user.home"), "application_dir", "logs_dir", "log_file.log");
		System.out.println("built path=" + p5.toAbsolutePath());
		
		Path p6 = Paths.get("/");
		System.out.println("Parent of root=" + p6.getParent());
		
		Path p7 = Paths.get(".");
		System.out.println("To Real path=" + p7.toRealPath());
		System.out.println("To URI=" + p7.toUri());
		
	}
}
