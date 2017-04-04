package com.sc.search.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;

public class MyFileUtils {

	public static void main(String[] args) {
		cleanCache();
		createFile("./out/file01.txt", "File 01 Contents.");
		createSymbolicLink("./out/file01", "./out/file01.txt");
	}

	public static final Path createFile(String fileName, String content) {
		System.out.format("Creating file: %s%n", fileName);
		Path path = Paths.get(fileName);
		try (BufferedWriter writer = Files.newBufferedWriter(path, Charset.forName("ASCII"))) {
			if (StringUtils.isNotBlank(content)) {
				System.out.format("Writing Content: %s%n", content);
				writer.write(content);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return path;
	}

	public static final void createDirectory(String directoryName) {
		System.out.format("Making directory: %s%n", directoryName);
		Path directory = Paths.get(directoryName);
		try {
			if (Files.exists(directory) && !Files.isDirectory(directory)) {
				System.out.format("File with the same name already exists. Deleting file: %s%n", directory);
				Files.delete(directory);
			}

			if (!Files.exists(directory)) {
				Files.createDirectory(directory);
			} else {
				System.out.println("Directory already exists " + directoryName);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static final void createSymbolicLink(String linkName, String targetName) {
		Path link = Paths.get(linkName);
		Path target = Paths.get(targetName);
		System.out.format("Linking %s to %s%n", link.toAbsolutePath(), target.toAbsolutePath());
		try {
			Files.createSymbolicLink(link, target);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static final void cleanCache() {
		System.out.println("Cleaning cache...");
		try {
			File inDir = new File("./in");
			File outDir = new File("./out");
			if (inDir.exists()) {
				FileUtils.deleteDirectory(inDir);
			}
			if (outDir.exists()) {
				FileUtils.deleteDirectory(outDir);
			}
			inDir.mkdir();
			outDir.mkdir();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String displayFileContent(String fileName) {
		StringBuilder result = new StringBuilder();
		Path path = Paths.get(fileName);
		if (!Files.exists(path)) {
			System.out.println("Can not display content. File does not exists. " + path);
			return "";
		}

		
		try (BufferedReader reader = Files.newBufferedReader(path, Charset.forName("US-ASCII"))) {
			
			int ch = 0;
			while((ch=reader.read()) > 0) {
				result.append((char) ch);
			}
			System.out.println("############# File Content Start #############");
			System.out.println("File name: " + fileName);
			System.out.println(result);
			System.out.println("############# File Content End #############");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result.toString();
	}
}
