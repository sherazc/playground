package com.sc.spring3.web;

import java.io.Serializable;

import javax.validation.constraints.Size;

public class LoginForm implements Serializable {

	private static final long serialVersionUID = 1L;

	@Size (min=1, message="User Id is empty.")
	private String userId;

	@Size(min=5, message="Password should be longer than 5 characters")
	private String password;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
