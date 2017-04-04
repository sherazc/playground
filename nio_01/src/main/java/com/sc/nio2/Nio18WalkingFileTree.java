package com.sc.nio2;

import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

public class Nio18WalkingFileTree {
	public static void main(String[] args) throws Exception {
		Path startingDirectory = Paths.get("../../");
		PrintFileVistor printFileVistor = new PrintFileVistor();
		Files.walkFileTree(startingDirectory, printFileVistor);
	}
}

class PrintFileVistor extends SimpleFileVisitor<Path> {
	@Override
	public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
		if (attrs.isSymbolicLink()) {
			System.out.println("Symbolic link " + file);
		} else if (attrs.isRegularFile()) {
			System.out.println("Regular file " + file);
		} else {
			System.out.println("other " + file);
		}
		return FileVisitResult.CONTINUE;
	}
	
	@Override
	public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
		System.out.println("############# Dir Start " + dir);
		return FileVisitResult.CONTINUE;
	}
	
	@Override
	public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
		System.out.println("############# Dir End " + dir);
		return FileVisitResult.CONTINUE;
	}
	
	@Override
	public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
		System.out.println(exc);
		return FileVisitResult.CONTINUE;
	}
}