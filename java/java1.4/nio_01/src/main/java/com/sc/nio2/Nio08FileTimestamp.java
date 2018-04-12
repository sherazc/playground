package com.sc.nio2;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.util.Calendar;

public class Nio08FileTimestamp {

	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		Path file01Path = MyFileUtils.createFile("./in/file01.txt", "Test content");
		System.out.println("########### Before changing timestamp");
		BasicFileAttributes basicFileAttributes = Files.readAttributes(file01Path, BasicFileAttributes.class);
		
		System.out.println("creationTime: " + basicFileAttributes.creationTime());
		System.out.println("lastAccessTime: " + basicFileAttributes.lastAccessTime());
		System.out.println("lastModifiedTime: " + basicFileAttributes.lastModifiedTime());

		System.out.println("isDirectory: " + basicFileAttributes.isDirectory());
		System.out.println("isOther: " + basicFileAttributes.isOther());
		System.out.println("isRegularFile: " + basicFileAttributes.isRegularFile());
		System.out.println("isSymbolicLink: " + basicFileAttributes.isSymbolicLink());
		System.out.println("size: " + basicFileAttributes.size());
		
		System.out.println("########### After changing timestamp");
		System.out.println("Adding 3 days in last modified time");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, 3);
		FileTime fileTime = FileTime.fromMillis(calendar.getTimeInMillis());
		Files.setLastModifiedTime(file01Path, fileTime);
		
		basicFileAttributes = Files.readAttributes(file01Path, BasicFileAttributes.class);
		
		System.out.println("creationTime: " + basicFileAttributes.creationTime());
		System.out.println("lastAccessTime: " + basicFileAttributes.lastAccessTime());
		System.out.println("lastModifiedTime: " + basicFileAttributes.lastModifiedTime());

		System.out.println("isDirectory: " + basicFileAttributes.isDirectory());
		System.out.println("isOther: " + basicFileAttributes.isOther());
		System.out.println("isRegularFile: " + basicFileAttributes.isRegularFile());
		System.out.println("isSymbolicLink: " + basicFileAttributes.isSymbolicLink());
		System.out.println("size: " + basicFileAttributes.size());

	}
}
