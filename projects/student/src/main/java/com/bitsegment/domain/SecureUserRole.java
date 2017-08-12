package com.bitsegment.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

@NamedQueries({ @NamedQuery(name = "userRoleByUserName", query = " select sr from SecureUserRole sr where sr.secureUser.userName = :userName ") })
@Table(name = "secure_user_role")
@Entity
public class SecureUserRole extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_role_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private SecureUser secureUser;

	@Column(name = "authority")
	@Enumerated(EnumType.STRING)
	private Authority authority;

	public SecureUserRole() {
		super();
	}

	public SecureUserRole(Long id, SecureUser secureUser, Authority authority) {
		super();
		this.id = id;
		this.secureUser = secureUser;
		this.authority = authority;
	}

	@Override
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SecureUser getSecureUser() {
		return secureUser;
	}

	public void setSecureUser(SecureUser secureUser) {
		this.secureUser = secureUser;
	}

	public Authority getAuthority() {
		return authority;
	}

	public void setAuthority(Authority authority) {
		this.authority = authority;
	}

	@Override
	public boolean equals(Object object) {
		SecureUserRole other = (SecureUserRole) object;
		EqualsBuilder equalsBuilder = new EqualsBuilder();
		// equalsBuilder.append(this, other);
		equalsBuilder.append(this.getId(), other.getId());
		equalsBuilder.append(this.getAuthority(), other.getAuthority());
		equalsBuilder.append(this.getSecureUser(), other.getSecureUser());
		return equalsBuilder.isEquals();
	}

	@Override
	public int hashCode() {
		HashCodeBuilder hashCodeBuilder = new HashCodeBuilder();
		hashCodeBuilder.append(this.getAuthority());
		hashCodeBuilder.append(this.getSecureUser());
		return hashCodeBuilder.toHashCode();
	}
}
