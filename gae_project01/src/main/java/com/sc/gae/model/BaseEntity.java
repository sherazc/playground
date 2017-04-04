package com.sc.gae.model;

import java.io.Serializable;

public abstract class BaseEntity {

	public abstract Serializable getId();

	@Override
	public String toString() {
		return this.getClass() + ": id="+ this.getId();
	}
	
}
