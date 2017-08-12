package com.sc.domain;

import java.io.Serializable;

public class State extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String stateAbr;
	private String state;//

	public State() {
	}

	public State(String stateAbr, String state) {
		super();
		this.stateAbr = stateAbr;
		this.state = state;
	}

	public String getStateAbr() {
		return stateAbr;
	}

	public void setStateAbr(String stateAbr) {
		this.stateAbr = stateAbr;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Override
	public Serializable getId() {
		return this.getStateAbr();
	}
}
