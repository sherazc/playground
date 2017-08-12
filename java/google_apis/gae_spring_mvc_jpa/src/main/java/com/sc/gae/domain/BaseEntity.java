package com.sc.gae.domain;

import java.io.Serializable;

import org.apache.commons.lang.builder.EqualsBuilder;

public abstract class BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	public abstract Serializable getId();

	public abstract String getEncodedId();

	@Override
	public String toString() {
		return this.getClass() + ": id=" + this.getId();
	}

	@Override
	public int hashCode() {
		int hashCode = 37 * 43;
		if (getId() != null) {
			hashCode *= this.getId().hashCode();
		}
		return hashCode;
	}

	@Override
	public boolean equals(Object obj) {
		boolean equal = obj != null;
		equal = equal ? this.getClass().equals(obj.getClass()) : false;
		equal = equal && new EqualsBuilder().append(this.getId(), ((BaseEntity) obj).getId()).isEquals();
		return equal;
	}
}
