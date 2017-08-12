package com.sc.nio;

import java.nio.ByteBuffer;

public class Nio04BufferMarkReset {

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

		System.out.println("Marking Buffer.");
		byteBuffer.mark();
		printBufferDetails(byteBuffer);

		System.out.println("Reading 1 more byte.");
		byteBuffer.get();
		printBufferDetails(byteBuffer);

		System.out.println("Resetting Buffer.");
		byteBuffer.reset();
		printBufferDetails(byteBuffer);

		System.out.println("Reading 1 more byte again.");
		byteBuffer.get();
		printBufferDetails(byteBuffer);

		System.out.println("Resetting Buffer again.");
		byteBuffer.reset();
		printBufferDetails(byteBuffer);

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
