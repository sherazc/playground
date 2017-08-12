package com.bitsegment.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "student_fee_paid")
public class StudentFeePaid extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

	@Column(name = "fee_paid_amount")
	private Integer feePaidAmount;

	@Column(name = "fee_date")
	private Date feeDate;

	@Column(name = "dml_date")
	private Date dmlDate;

	//@ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id")
	private StudentData studentData;

	public StudentFeePaid() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getFeePaidAmount() {
		return feePaidAmount;
	}

	public void setFeePaidAmount(Integer feePaidAmount) {
		this.feePaidAmount = feePaidAmount;
	}

	public Date getDmlDate() {
		return dmlDate;
	}

	public void setDmlDate(Date dmlDate) {
		this.dmlDate = dmlDate;
	}

	public StudentData getStudentData() {
		return studentData;
	}

	public void setStudentData(StudentData studentData) {
		this.studentData = studentData;
	}

	public Date getFeeDate() {
		return feeDate;
	}

	public void setFeeDate(Date feeDate) {
		this.feeDate = feeDate;
	}
}
