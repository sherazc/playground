package com.sc.search.domain;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.List;

public class FileSearchDetail {

	private static final int BUFFER_SIZE = 2;
	private static final int MAX_SEARCHABLE_BUFFERS = 1;
	private List<Find> finds = new ArrayList<Find>();
	private long filePosition;
	private long fileSize;
	private String file;
	private String searchString;
	private int searchStringSize;
	private FileChannel fileChannel;
	private RandomAccessFile randomAccessFile;
	private StringBuilder currentSearchable = new StringBuilder();
	private ByteBuffer byteBuffer = ByteBuffer.allocate(BUFFER_SIZE);
	private boolean readProcessComplete;
	private boolean searchableReady;
	

	public void resetSearchableData() {
		if (currentSearchable.length() > searchStringSize) {
			currentSearchable.delete(0, currentSearchable.length() - searchStringSize + 1);
		} else {
			currentSearchable.delete(0, currentSearchable.length());
		}
		this.setSearchableReady(false);
	}

	public FileSearchDetail(String file, String searchString) throws IOException {
		super();
		this.file = file;
		this.searchString = searchString;
		this.randomAccessFile = new RandomAccessFile(file, "r");
		this.fileChannel = randomAccessFile.getChannel();
		this.setFileSize(this.fileChannel.size());
		this.searchStringSize = searchString.length();
	}

	public void buildSearchableData() {
		try {
			int bytesRead = fileChannel.read(byteBuffer);
			moveFilePosition(bytesRead);
			byteBuffer.flip();
			while (byteBuffer.hasRemaining()) {
				currentSearchable.append((char) byteBuffer.get());
			}
			byteBuffer.clear();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public boolean haveEnoughSearchableData() {
		return currentSearchable.length() >= (searchStringSize + (BUFFER_SIZE * MAX_SEARCHABLE_BUFFERS));
	}

	public boolean reachedFileEnd() {
		//System.out.println("EOF: " + (filePosition >= fileSize));
		return filePosition >= fileSize;
	}

	public long moveFilePosition(long moveBy) {
		filePosition += moveBy;
		return filePosition;
	}

	public boolean isChannelOpen() {
		return this.fileChannel != null && this.fileChannel.isOpen();
	}

	public void close() throws IOException {
		this.randomAccessFile.close();
		this.fileChannel.close();
	}

	public List<Find> getFinds() {
		return finds;
	}

	public void setFinds(List<Find> finds) {
		this.finds = finds;
	}

	public long getFilePosition() {
		return filePosition;
	}

	public void setFilePosition(long filePosition) {
		this.filePosition = filePosition;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public FileChannel getFileChannel() {
		return fileChannel;
	}

	public void setFileChannel(FileChannel fileChannel) {
		this.fileChannel = fileChannel;
	}

	public StringBuilder getCurrentSearchable() {
		return currentSearchable;
	}

	public void setCurrentSearchable(StringBuilder currentSearchable) {
		this.currentSearchable = currentSearchable;
	}

	public boolean isReadProcessComplete() {
		return readProcessComplete;
	}

	public void setReadProcessComplete(boolean readProcessComplete) {
		this.readProcessComplete = readProcessComplete;
	}

	public boolean isSearchableReady() {
		return searchableReady;
	}

	public void setSearchableReady(boolean searchableReady) {
		this.searchableReady = searchableReady;
	}
	
	
}
