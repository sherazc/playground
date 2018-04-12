package com.sc.nio;

import java.io.File;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Date;
import java.util.Scanner;

import com.sc.nio2.MyFileUtils;

public class Nio12SearchFile {
	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		String workingFileName = "./in/working_file_01.txt";
		String fileDataString = "Some content in \nfile. This string can be searched.\nThis file was written on "
				+ new Date() + ". It is a simple text file.";
		String searchString = "simple";

		MyFileUtils.createFile(workingFileName, fileDataString);

		
		
		searchStringInFile(workingFileName, searchString);
	}

	private static void searchStringInFile(String workingFileName, String searchString) throws Exception {
		

        Scanner scanner = new Scanner(new File(workingFileName));
        while (scanner.hasNextLine()) {
            String nextToken = scanner.next();
            if (nextToken.equalsIgnoreCase(searchString)) {
               System.out.println("Phrase Found" + searchString + "in file" + workingFileName);
               break;

            }
        }
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
