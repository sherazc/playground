package com.sc.spring3.db.domain;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;

public class Address implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String street;
	private String city;
	private String zip;

	public Address() {
	}

	public Address(Long id, String street, String city, String zip) {
		this.id = id;
		this.street = street;
		this.city = city;
		this.zip = zip;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
