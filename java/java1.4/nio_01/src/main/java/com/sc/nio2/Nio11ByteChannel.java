package com.sc.nio2;

import java.io.File;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.HashSet;
import java.util.Set;

public class Nio11ByteChannel {
	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		// Path path = MyFileUtils.createFile("./in/working_file.txt", null);
		Path path = Paths.get("./in/working_file.txt");

		Set<OpenOption> options = new HashSet<OpenOption>();
		options.add(StandardOpenOption.APPEND);
		options.add(StandardOpenOption.CREATE);
		// http://docs.oracle.com/javase/tutorial/essential/io/file.html
		// Test if these permissions work in linux
		// Set<PosixFilePermission> perms =
		// PosixFilePermissions.fromString("rw-r------");
		//
		// FileAttribute<Set<PosixFilePermission>> attr =
		// PosixFilePermissions.asFileAttribute(perms);

		String contentString = "this is some content. this is some content. this is some content. this is some content.";
		byte[] data = contentString.getBytes();
		ByteBuffer byteBuffer = ByteBuffer.wrap(data);

		try (SeekableByteChannel seekableByteChannel = Files.newByteChannel(path, options)) {
			seekableByteChannel.write(byteBuffer);
			System.out.println("Data writen to file.");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("Reading content...");
		options.clear();
		options.add(StandardOpenOption.READ);
		try(SeekableByteChannel seekableByteChannel = Files.newByteChannel(path, options)) {
			byteBuffer = ByteBuffer.allocate(10);
			String encoding = System.getProperty("file.encoding");
			while (seekableByteChannel.read(byteBuffer) > 0) {
				byteBuffer.rewind();
				System.out.print(Charset.forName(encoding).decode(byteBuffer));
				byteBuffer.flip();
				//byteBuffer.clear();
				//System.out.print(Charset.forName(encoding).decode(byteBuffer));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
