package com.sc.domain;

import java.io.Serializable;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

public abstract class BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	public abstract Serializable getId();

	@Override
	public String toString() {
		return new ReflectionToStringBuilder(this).toString();
	}

	@Override
	public int hashCode() {
		int hashCode = super.hashCode();
		if (getId() != null) {
			hashCode *= this.getId().hashCode();
		}
		return hashCode;
	}

	@Override
	public boolean equals(Object obj) {
		boolean equal = obj != null;
		equal = equal ? this.getClass().equals(obj.getClass()) : false;
		equal = equal && this.getId() != null ? this.getId().equals(((BaseEntity) obj).getId()) : false;
		return equal;
	}
}
