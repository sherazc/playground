package com.bitsegment.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@NamedQueries({ @NamedQuery(name = "userByUserName", query = "select s from SecureUser s where s.userName = :userName") })
@Table(name = "secure_user")
@Entity
public class SecureUser extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id")
	private Long id;

	@Column(name = "user_name")
	private String userName;

	@Column(name = "user_password")
	private String userPassword;

	@Column(name = "enabled")
	private Integer enabled;

	@OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private Set<SecureUserRole> secureUserRoles;

	@Override
	public Long getId() {
		return id;
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

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<SecureUserRole> getSecureUserRoles() {
		if (secureUserRoles == null) {
			secureUserRoles = new HashSet<SecureUserRole>();
		}
		return secureUserRoles;
	}

	public void setSecureUserRoles(Set<SecureUserRole> secureUserRoles) {
		this.secureUserRoles = secureUserRoles;
	}

	public void addAuthority(Authority authority) {
		SecureUserRole role = new SecureUserRole(null, this, authority);
		this.getSecureUserRoles().add(role);
	}

	public Set<String> allRoles() {
		Set<String> roles = new HashSet<String>();
		for (SecureUserRole secureUserRole : this.getSecureUserRoles()) {
			if (secureUserRole.getAuthority() != null) {
				roles.add(secureUserRole.getAuthority().toString());
			}
		}
		return roles;
	}
}
