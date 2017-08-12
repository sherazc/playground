package com.sc.search.domain;

public class Find {

	private int lineNumber;
	private int linePosition;
	private String searchString;

	public Find() {
	}

	public Find(int lineNumber, int linePosition, String searchString) {
		super();
		this.lineNumber = lineNumber;
		this.linePosition = linePosition;
		this.searchString = searchString;
	}

	public int getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber(int lineNumber) {
		this.lineNumber = lineNumber;
	}

	public int getLinePosition() {
		return linePosition;
	}

	public void setLinePosition(int linePosition) {
		this.linePosition = linePosition;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

}
