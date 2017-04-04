package com.sc.domain;

import java.io.Serializable;

public class Zip extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String zipCode;
	private String longitude;
	private String latitude;
	private String city;
	private String county;
	private State state;//

	public Zip() {
	}

	public Zip(String zipCode, String longitude, String latitude, String city, String county, State state) {
		super();
		this.zipCode = zipCode;
		this.longitude = longitude;
		this.latitude = latitude;
		this.city = city;
		this.county = county;
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	@Override
	public Serializable getId() {
		return this.getZipCode();
	}
}
