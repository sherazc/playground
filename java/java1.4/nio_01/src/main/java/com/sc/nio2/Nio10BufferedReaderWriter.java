package com.sc.nio2;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Nio10BufferedReaderWriter {
	public static void main(String[] args) {
		MyFileUtils.cleanCache();

		Charset charset = Charset.forName("US-ASCII");
		String someContent = "This is some content.";

		Path workingFile = Paths.get("./in/myfile01.txt");
		System.out.println("Writing file...");
		try (BufferedWriter writer = Files.newBufferedWriter(workingFile, charset)) {
			writer.write(someContent);
		} catch (IOException e) {
			System.err.println("IOException " + e.getMessage());
		}

		System.out.println("Reading file content...");
		try (BufferedReader reader = Files.newBufferedReader(workingFile, charset)) {
			String line = null;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}
		} catch (IOException e) {
			System.err.println("IOException " + e.getMessage());
		}
	}
}
