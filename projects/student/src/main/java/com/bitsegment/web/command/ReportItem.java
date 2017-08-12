package com.bitsegment.web.command;

import java.io.Serializable;

public class ReportItem implements Serializable {

	private static final long serialVersionUID = 1L;

	private int index;

	private String field;

	private String value;

	public ReportItem() {
	}
	
	public ReportItem(int index, String field, String value) {
		this.index = index;
		this.field = field;
		this.value = value;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}