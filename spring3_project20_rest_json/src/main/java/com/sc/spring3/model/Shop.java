package com.sc.spring3.model;

import java.io.Serializable;

public class Shop implements Serializable {

	private static final long serialVersionUID = 1L;
	private String name;
	private String staffName[];

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String[] getStaffName() {
		return staffName;
	}

	public void setStaffName(String[] staffName) {
		this.staffName = staffName;
	}

}
