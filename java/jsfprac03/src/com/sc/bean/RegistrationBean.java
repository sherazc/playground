package com.sc.bean;

import java.io.Serializable;

public class RegistrationBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String email = "user@host";
	private String password = "";

	private SuggestionBean suggestion;
	
	public String getEmail() {
		return (email);
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return (password);
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public SuggestionBean getSuggestion() {
	    return(suggestion);
	  }
	
	public String register() {
		if ((email == null) || (email.trim().length() < 3)
				|| (email.indexOf("@") == -1)) {
			
			this.suggestion = SuggestionUtils.getSuggestionBean();
			return "bad-address";
		} else if (password == null || password.trim().length() < 6){
			suggestion = SuggestionUtils.getSuggestionBean();
			return "bad-password";
		} else {
			return "success";
		}
	}
}
