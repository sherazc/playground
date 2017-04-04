package com.sc.spring3.db.domain;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;

public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String email;
	private Double salary;
	private Address location;

	public Customer() {
	}

	public Customer(Long id, String name, String email, Double salary, Address location) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.salary = salary;
		this.location = location;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public Address getLocation() {
		return location;
	}

	public void setLocation(Address location) {
		this.location = location;
	}
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
