package com.sc.bean;

import java.io.Serializable;

public class SuggestionBean implements Serializable {
	private static final long serialVersionUID = 1L;
	private String email;
	private String password;

	public SuggestionBean(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return (email);
	}

	public String getPassword() {
		return (password);
	}
}
