package com.bitsegment.web.command;

import java.io.Serializable;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import com.bitsegment.util.ServiceUtils;

public class StudentCommand implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	@Size(min = 1, message = "First Name is empty")
	private String firstName;

	@Size(min = 1, message = "Last Name is empty")
	private String lastName;

	@Size(min = 1, message = "Guardian First Name is empty")
	private String guardianFirstName;

	@Size(min = 1, message = "Guardian Last Name is empty")
	private String guardianLastName;

	@Size(min = 1, message = "Registration Date is empty")
	private String registrationDate;

	@Size(min = 10, max = 10, message = "Phone number must be 10 digits long")
	private String phoneNumber;

	@Min(value = 0, message = "Fee must be zero or more")
	@Max(value = 9999, message = "Fee must be less than 9999")
	@Digits(fraction = 0, integer = 5, message = "Fee must be in digits and no fraction")
	private String fee;

	private String address;

	private String city;

	private String state;

	private String zip;

	public StudentCommand() {
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getGuardianFirstName() {
		return guardianFirstName;
	}

	public void setGuardianFirstName(String guardianFirstName) {
		this.guardianFirstName = guardianFirstName;
	}

	public String getGuardianLastName() {
		return guardianLastName;
	}

	public void setGuardianLastName(String guardianLastName) {
		this.guardianLastName = guardianLastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFormatedPhoneNumber() {
		return ServiceUtils.formatPhoneNumber(phoneNumber);
	}

	public void setFormatedPhoneNumber(String phoneNumber) {
		this.phoneNumber = ServiceUtils.extractDigits(phoneNumber);
	}

	public String getFee() {
		return fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(String registrationDate) {
		this.registrationDate = registrationDate;
	}
}
