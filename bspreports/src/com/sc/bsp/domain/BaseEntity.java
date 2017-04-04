package com.sc.bsp.domain;

import java.io.Serializable;

public abstract class BaseEntity {

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
		equal = equal && this.getId() != null ? this.getId().equals(((BaseEntity) obj).getId()) : false;
		return equal;
	}
}
