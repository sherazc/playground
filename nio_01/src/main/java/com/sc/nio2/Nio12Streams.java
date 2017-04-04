package com.sc.nio2;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class Nio12Streams {

	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		Path workingFile = Paths.get("./in/workfile.txt");
		byte[] data = "This is some data String.".getBytes();

		System.out.println("Writing data in " + workingFile);
		try (OutputStream out = new BufferedOutputStream(Files.newOutputStream(workingFile, StandardOpenOption.CREATE,
				StandardOpenOption.APPEND))) {
			out.write(data);
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("Reading data from " + workingFile);
		try (InputStream in = Files.newInputStream(workingFile, StandardOpenOption.READ)) {
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));

			String line = null;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
