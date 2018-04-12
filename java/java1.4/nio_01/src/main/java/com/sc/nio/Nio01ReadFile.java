package com.sc.nio;

import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import com.sc.nio2.MyFileUtils;

public class Nio01ReadFile {
	public static void main(String[] args) throws Exception {
		// http://tutorials.jenkov.com/java-nio/channels.html
		MyFileUtils.cleanCache();
		MyFileUtils.createFile("./in/file01.txt",
				"Some content in file 01.\nMore Content and content.\n and some stuff stuff...");

		System.out.println("######## Reading file");
		RandomAccessFile randomAccessFile = new RandomAccessFile("./in/file01.txt", "rw");
		// Opening file channel
		FileChannel fileChannel = randomAccessFile.getChannel();

		// Allocated a byte buffer memory working location
		ByteBuffer byteBuffer = ByteBuffer.allocate(8);
		int bytesRead = 0;

		// reading content from channel and writing into buffer
		while ((bytesRead = fileChannel.read(byteBuffer)) != -1) {
			System.out.println("\nRead " + bytesRead);

			// making buffer readable.
			byteBuffer.flip();

			// Reading Buffer
			while (byteBuffer.hasRemaining()) {
				System.out.print((char) byteBuffer.get());
			}
			// clearing buffer to be used again.
			byteBuffer.clear();
		}

		randomAccessFile.close();
	}
}
