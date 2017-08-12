package com.sc.bean;

import javax.faces.event.ActionEvent;

public class InputFieldsBean {

	private String name;
	private String password;
	private boolean savePassword;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isSavePassword() {
		return savePassword;
	}

	public void setSavePassword(boolean savePassword) {
		this.savePassword = savePassword;
	}

	public String submitInputFields() {
		if ("sheraz".equalsIgnoreCase(name) && "password".equalsIgnoreCase(password)) {
			return "success";
		} else {
			return "failed";
		}
	}
	
	public void nameChanged(ActionEvent event) {
		System.out.println("Name was changed");
	}
	
	public void passwordChanged(ActionEvent event) {
		System.out.println("Password was changed");
	}
}
