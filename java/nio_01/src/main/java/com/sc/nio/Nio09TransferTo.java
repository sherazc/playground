package com.sc.nio;

import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.file.Path;

import com.sc.nio2.MyFileUtils;

public class Nio09TransferTo {
	public static void main(String[] args) throws Exception {
		MyFileUtils.cleanCache();
		Path pathFrom = MyFileUtils.createFile("./in/file_from.txt", "abcd xyz 12345");

		Path pathTo = MyFileUtils.createFile("./in/file_to.txt", "Sheraz content ABCDEFGHIJK");

		RandomAccessFile randomAccessFileFrom = new RandomAccessFile(pathFrom.toFile(), "rw");
		FileChannel fileChannelFrom = randomAccessFileFrom.getChannel();

		RandomAccessFile randomAccessFileTo = new RandomAccessFile(pathTo.toFile(), "rw");
		FileChannel fileChannelTo = randomAccessFileTo.getChannel();

		System.out.println("Transfering/appending content from " + pathFrom + " to " + pathTo);

		// I have figured out how to transfer content and appending at the end
		// of the file using "transferFrom()" but in "transferTo()" I am only
		// able to overwrite content
		fileChannelFrom.transferTo(0, fileChannelFrom.size(), fileChannelTo);

		MyFileUtils.displayFileContent(pathFrom.toString());
		MyFileUtils.displayFileContent(pathTo.toString());

		fileChannelFrom.close();
		randomAccessFileFrom.close();

		fileChannelTo.close();
		randomAccessFileTo.close();
	}
}
