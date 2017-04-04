package com.bitsegment.web.command;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Size;

import com.bitsegment.domain.Authority;

public class SecureUserCommand implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userId;

	@Size(min = 4, message = "Please enter a valid user name. User name should be atleast 4 characters long.")
	private String userName;

	@Size(min = 4, message = "Please enter a valid password. Password should be atleast 4 characters long.")
	private String userPassword;

	private Set<String> securityRoles;

	boolean adminCodeVerified;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public Set<String> getSecurityRoles() {
		return securityRoles;
	}

	public void setSecurityRoles(Set<String> securityRoles) {
		this.securityRoles = securityRoles;
	}

	public List<String> getDefaultRoles() {
		List<String> roles = new ArrayList<String>();
		for (Authority authority : Authority.values()) {
			roles.add(authority.toString());
		}
		return roles;
	}

	public boolean isAdminCodeVerified() {
		return adminCodeVerified;
	}

	public void setAdminCodeVerified(boolean adminCodeVerified) {
		this.adminCodeVerified = adminCodeVerified;
	}
}
