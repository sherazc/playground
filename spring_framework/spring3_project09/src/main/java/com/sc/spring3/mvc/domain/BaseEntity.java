package com.sc.spring3.mvc.domain;

import java.io.Serializable;

public abstract class BaseEntity {

	public abstract Serializable getId();

	@Override
	public String toString() {
		return this.getClass() + ": id="+ this.getId();
	}
	
}
