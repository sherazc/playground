package com.sc.spring3.domain;

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
		boolean equal = object != null;
		equal = equal ? this.getClass().equals(object.getClass()) : false;
		equal = equal && new EqualsBuilder().append(this.getId(), ((BaseEntity) object).getId()).isEquals();
		return equal;
	}

	@Override
	public int hashCode() {
		HashCodeBuilder hcb = new HashCodeBuilder(17, 21);
		//hcb.append(this);
		hcb.append(this.getId());
		return hcb.toHashCode();
	}

}
