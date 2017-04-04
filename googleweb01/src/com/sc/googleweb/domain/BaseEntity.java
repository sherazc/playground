package com.sc.googleweb.domain;

import java.io.Serializable;

public abstract class BaseEntity {

	public abstract Serializable getId();

	@Override
	public String toString() {
		return this.getClass() + ": id="+ this.getId();
	}
	
}
