package com.sc.nio;

import java.nio.ByteBuffer;

public class Nio03BufferCompactClear {

	public static void main(String[] args) {
		System.out.println("Created new byte buffer. Allocating 8 bytes.");
		ByteBuffer byteBuffer = ByteBuffer.allocate(8);
		printBufferDetails(byteBuffer);

		System.out.println("Putting/writing 3 bytes in buffer");
		byteBuffer.put("abc".getBytes());
		printBufferDetails(byteBuffer);

		System.out.println("Fliping buffer to make it readable");
		byteBuffer.flip();
		printBufferDetails(byteBuffer);

		System.out.println("Reading 2 bytes from byte buffer.");
		byteBuffer.get();
		byteBuffer.get();
		printBufferDetails(byteBuffer);

		// "compact()" clear off all the read data
		System.out.println("Compacting Buffer.");
		byteBuffer.compact();
		printBufferDetails(byteBuffer);

		// Where as "clear()" clears off all data, read or unread
		System.out.println("Clearing Buffer.");
		byteBuffer.clear();
		printBufferDetails(byteBuffer);
	}

	private static void printBufferDetails(ByteBuffer byteBuffer) {
		System.out.println("#################### Buffer Details ####################");
		System.out.println("Capacity=" + byteBuffer.capacity());
		System.out.println("Limit=" + byteBuffer.limit());
		System.out.println("Position=" + byteBuffer.position());
		System.out.println("hasRemaining=" + byteBuffer.hasRemaining());
		System.out.println("########################################################\n");
	}
}
