package com.sc.nio;

import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Date;

import com.sc.nio2.MyFileUtils;

public class Nio11FileChannel {

	public static void main(String[] args) throws Exception {
		// MyFileUtils.cleanCache();
		String workingFileName = "./in/working_file_01.txt";
		// String fileDataString =
		// "Some content in \nfile. This string can be searched.\nThis file was written on "
		// + new Date() + ". It is a simple text file.";
		String fileDataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		String searchString = "abcd";

		// writeContentToFile(workingFileName, fileDataString);
		// String content = readFileContent(workingFileName);
		// System.out.println(content);

		searchStringInFile(workingFileName, searchString);
	}

	private static void searchStringInFile(String workingFileName, String searchString) throws Exception {
		RandomAccessFile randomAccessFile = new RandomAccessFile(workingFileName, "rw");
		FileChannel fileChannel = randomAccessFile.getChannel();
		int bufferSize = 4;
		int searchStringSize = searchString.length();
		ByteBuffer buffer = ByteBuffer.allocate(bufferSize);

		boolean searchComplete = false;
		int searchableBufferCount = (searchStringSize / bufferSize) + 2;
		long fileSize = fileChannel.size();
		int searchFilePosition = 0;
		while (!searchComplete) {
			StringBuilder searchableStringBuilder = new StringBuilder();
			int searchableBufferCountCurrent = 0;
			int bytesRead = 0;
			while (searchableBufferCountCurrent < searchableBufferCount && (bytesRead = fileChannel.read(buffer)) != -1) {
				searchFilePosition += bytesRead;
				searchableBufferCountCurrent++;
				buffer.flip();
				while (buffer.hasRemaining()) {
					searchableStringBuilder.append((char) buffer.get());
				}
				buffer.clear();
			}

			System.out.println(searchableStringBuilder);
			searchComplete = searchFilePosition + 1 > fileSize;
		}
		randomAccessFile.close();
	}

	private static String readFileContent(String workingFileName) throws Exception {
		StringBuilder stringBuilder = new StringBuilder();
		int bufferSize = 4;
		ByteBuffer buffer = ByteBuffer.allocate(bufferSize);
		RandomAccessFile randomAccessFile = new RandomAccessFile(workingFileName, "rw");
		FileChannel fileChannel = randomAccessFile.getChannel();

		while (fileChannel.read(buffer) > -1) {
			buffer.flip();
			while (buffer.hasRemaining()) {
				stringBuilder.append((char) buffer.get());
			}
			buffer.clear();
		}

		fileChannel.close();
		randomAccessFile.close();
		System.out.println("Content read.");
		return stringBuilder.toString();
	}

	private static void writeContentToFile(String workingFileName, String fileDataString) throws Exception {
		int bufferSize = 4;
		ByteBuffer buffer = ByteBuffer.allocate(bufferSize);
		RandomAccessFile randomAccessFile = new RandomAccessFile(workingFileName, "rw");
		FileChannel fileChannel = randomAccessFile.getChannel();

		int dataLength = fileDataString.length();
		int position = 0;
		while (position < fileDataString.length()) {
			String dataSlice = null;
			int endLimit = position + bufferSize;
			if (endLimit > dataLength) {
				endLimit = dataLength;
			}
			dataSlice = fileDataString.substring(position, endLimit);
			buffer.put(dataSlice.getBytes());
			buffer.flip();
			fileChannel.write(buffer, fileChannel.size());
			buffer.clear();
			position += bufferSize;
		}
		fileChannel.close();
		randomAccessFile.close();
		System.out.println("Content writen.");
	}
}
