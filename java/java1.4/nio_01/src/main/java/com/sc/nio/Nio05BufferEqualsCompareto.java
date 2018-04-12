package com.sc.nio;

import java.nio.ByteBuffer;

public class Nio05BufferEqualsCompareto {

	public static void main(String[] args) {
		ByteBuffer bb1 = ByteBuffer.allocate(8);
		ByteBuffer bb2 = ByteBuffer.allocate(8);
		printBufferEquals(bb1, bb2, "Created 2 new buffers.");
		
		bb1.put("abc".getBytes());
		printBufferEquals(bb1, bb2, "Added 3 bytes to buffer 1");
		
		bb2.put("abc".getBytes());
		printBufferEquals(bb1, bb2, "Added same 3 bytes to buffer 2");
		
		bb1.get();
		printBufferEquals(bb1, bb2, "Read 1 byte from buffer 1");
		
		bb2.get();
		printBufferEquals(bb1, bb2, "Read 1 byte from buffer 2");
		
		bb1.mark();
		printBufferEquals(bb1, bb2, "Marked buffer 1");
		
		bb1.rewind();
		printBufferEquals(bb1, bb2, "Rewind buffer 1");
	}

	private static void printBufferEquals(ByteBuffer bb1, ByteBuffer bb2, String message) {
		System.out.println(message);
		System.out.println("####### Comparing buffers:");
		System.out.println("Buffer equals=" + bb1.equals(bb2));
		System.out.println("Buffer compareto=" + bb1.compareTo(bb2));
		System.out.println("#######\n");
	}
}
