package com.sc.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@NamedQueries({ @NamedQuery(name = "allAttendee", query = "select a from Attendee a") })

@Entity
@Table(name = "ATTENDEE")
public class Attendee extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ID_SEQUENCE")
	@SequenceGenerator(name = "ID_SEQUENCE", sequenceName = "ID_SEQUENCE", allocationSize = 1)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FIRST_NAME")
	private String firstName;

	@Column(name = "LAST_NAME")
	private String lastName;
	
	@Column(name = "PHONE_NUMBER")
	private String phoneNumber;

	@Column(name = "ADDRESS_LINE_1")
	private String addressLine1;

	@Column(name = "ADDRESS_LINE_2")
	private String addressLine2;

	@Column(name = "CITY")
	private String city;

	@Column(name = "STATE")
	private String state;

	@Column(name = "ZIP_CODE")
	private String zipCode;

	@Column(name = "DML_DATE")
	private Date dmlDate;
	
	@Transient
	private boolean editable;

	public Attendee() {
	}

	public Attendee(Long id, String firstName, String lastName, String addressLine1, String addressLine2, String city,
			String state, String zipCode, Date dmlDate) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.dmlDate = dmlDate;
	}

	@Override
	public Long getId() {
		return id;
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

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
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

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public Date getDmlDate() {
		return dmlDate;
	}

	public void setDmlDate(Date dmlDate) {
		this.dmlDate = dmlDate;
	}

	public void setId(Long id) {
		this.id = id;
	}
//
//	public String getName() {
//		if (StringUtils.isBlank(name) && StringUtils.isNotBlank(this.getFirstName())
//				&& StringUtils.isNotBlank(this.getLastName())) {
//			name = this.getFirstName() + " " + this.getLastName();
//		}
//		return name;
//	}
//
//	public void setName(String name) {
//		if (StringUtils.isNotBlank(name)) {
//			String[] nameSplit = name.split(" ");
//			if (nameSplit != null && nameSplit.length > 0) {
//				this.setFirstName(nameSplit[0]);
//			}
//			if (nameSplit != null && nameSplit.length > 1) {
//				this.setLastName(nameSplit[nameSplit.length - 1]);
//			}
//		}
//		this.name = name;
//	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}
}
