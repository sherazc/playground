package com.sc.nio2;

import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class Nio14RandomAccessFiles {
	public static void main(String[] args) {
		MyFileUtils.cleanCache();
		Path path = MyFileUtils.createFile("./in/myfile.txt", "Some text in my file. it is used for testing.");

		System.out.println("Created new temporary data. 12 bytes.");
		byte[] data = "I was here!\n".getBytes();

		ByteBuffer out = ByteBuffer.wrap(data);
		ByteBuffer copy = ByteBuffer.allocate(12);

		try (FileChannel fileChannel = (FileChannel.open(path, StandardOpenOption.READ, StandardOpenOption.WRITE))) {

			System.out.println("Read first 12 bytes of file");
			int nread;
			do {
				nread = fileChannel.read(copy);
			} while (nread != -1 && copy.hasRemaining());

			System.out.println("Writing new data in the beginning of the file");
			fileChannel.position(0);
			while (out.hasRemaining()) {
				fileChannel.write(out);
			}

			System.out.println("Writing 12 byte that where read from the beginning of the file to the end of the file");
			long length = fileChannel.size();
			fileChannel.position(length - 1);
			copy.flip();
			while (copy.hasRemaining()) {
				fileChannel.write(copy);
			}

			System.out.println("Writing new data at the end of the file.");
			out.rewind();
			while (out.hasRemaining()) {
				fileChannel.write(out);
			}

			MyFileUtils.displayFileContent(path.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
