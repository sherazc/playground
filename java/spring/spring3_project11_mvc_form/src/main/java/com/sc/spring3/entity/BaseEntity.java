package com.sc.spring3.entity;

import java.io.Serializable;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

public abstract class BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	public abstract Serializable getId();

	@Override
	public String toString() {
		return this.getClass() + ": id=" + this.getId();
	}

	@Override
	public boolean equals(Object object) {
		BaseEntity other = (BaseEntity) object;
		return new EqualsBuilder().append(this.getId(), other.getId()).isEquals();
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(17, 21).append(this.getId()).toHashCode();
	}

}
