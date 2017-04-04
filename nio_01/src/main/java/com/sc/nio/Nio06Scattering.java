package com.sc.nio;

import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import com.sc.nio2.MyFileUtils;

public class Nio06Scattering {
	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		String fileName1 = "./in/file01.txt";
		MyFileUtils.createFile(fileName1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

	
		RandomAccessFile randomAccessFile1 = new RandomAccessFile(fileName1, "r");
		FileChannel fileChannel1 = randomAccessFile1.getChannel();
		
		ByteBuffer buffer1 = ByteBuffer.allocate(8);
		ByteBuffer buffer2 = ByteBuffer.allocate(8);
		ByteBuffer[] buffers = new ByteBuffer[] {buffer1, buffer2};
		
		;
		while((fileChannel1.read(buffers)) != -1) {
			buffer1.flip();
			buffer2.flip();
			
			System.out.print("\nBuffer1: ");
			while (buffer1.hasRemaining()) {
				System.out.print((char)buffer1.get());
			}
			
			System.out.print("\nBuffer2: ");
			while (buffer2.hasRemaining()) {
				System.out.print((char)buffer2.get());
			}
			
			buffer1.clear();
			buffer2.clear();
		}

		fileChannel1.close();
		randomAccessFile1.close();
	}
}

