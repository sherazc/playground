package com.bitsegment.domain;

import java.util.ArrayList;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.bitsegment.util.ServiceUtils;

@NamedQueries({ @NamedQuery(name = "studentDataCount", query = "select count(sd) from StudentData sd order by sd.firstName ") })
@Entity
@Table(name = "student_data")
public class StudentData extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "g_first_name")
	private String guardianFirstName;

	@Column(name = "g_last_name")
	private String guardianLastName;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "registration_date")
	private Date registrationDate;

	@Column(name = "create_date")
	private Date createDate;

	@Column(name = "dml_date")
	private Date dmlDate;

	@Column(name = "fee")
	private Integer fee;

	@OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private List<StudentFeePaid> studentFeePaids;

	@Transient
	private StudentFeePaid selectedStudentFeePaid;

	public StudentData() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Date getDmlDate() {
		return dmlDate;
	}

	public void setDmlDate(Date dmlDate) {
		this.dmlDate = dmlDate;
	}

	public Integer getFee() {
		return fee;
	}

	public void setFee(Integer fee) {
		this.fee = fee;
	}

	public List<StudentFeePaid> getStudentFeePaids() {
		if (studentFeePaids == null) {
			studentFeePaids = new ArrayList<StudentFeePaid>();
		}
		return studentFeePaids;
	}

	public void setStudentFeePaids(List<StudentFeePaid> studentFeePaids) {
		this.studentFeePaids = studentFeePaids;
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

	public void setFormatedPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFormatedPhoneNumber() {
		return ServiceUtils.formatPhoneNumber(getPhoneNumber());
	}

	public StudentFeePaid getSelectedStudentFeePaid() {
		return selectedStudentFeePaid;
	}

	public void setSelectedStudentFeePaid(StudentFeePaid selectedStudentFeePaid) {
		this.selectedStudentFeePaid = selectedStudentFeePaid;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}
}
