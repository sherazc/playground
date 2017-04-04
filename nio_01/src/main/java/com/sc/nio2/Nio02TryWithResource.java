package com.sc.nio2;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Nio02TryWithResource {
	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		Charset charset = Charset.forName("US-ASCII");
		String stringToWrite = "This is some output String...";
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get("./out/file01.txt"), charset)) {
			System.out.println("Writing...");
			writer.write(stringToWrite);
		} catch (IOException e) {
			System.err.format("IOException: %s%n", e);
		}
		System.out.println("Done!");
	}
}
