package com.sc.nio;

import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import com.sc.nio2.MyFileUtils;

public class Nio07Gather {
	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		RandomAccessFile randomAccessFile = new RandomAccessFile("./in/file01.txt", "rw");
		FileChannel fileChannel = randomAccessFile.getChannel();

		ByteBuffer byteBuffer1 = ByteBuffer.allocate(8);
		ByteBuffer byteBuffer2 = ByteBuffer.allocate(8);
		// ByteBuffer byteBuffer3 = null;

		byteBuffer1.put("abc".getBytes());
		byteBuffer2.put("xyz".getBytes());

		byteBuffer1.flip();
		byteBuffer2.flip();

		ByteBuffer[] byteBuffers = { byteBuffer1, byteBuffer2 };

		// Data from all buffers in the array will be written to the channel
		long noOfBytes = fileChannel.write(byteBuffers);

		byteBuffer1.clear();
		byteBuffer2.clear();

		fileChannel.close();
		randomAccessFile.close();

		System.out.println("Done! written data from buffer array to file channel. Bytes written=" + noOfBytes);
	}
}
