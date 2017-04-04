package com.sc.gae.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "STUDENT", schema = "PUBLIC")
public class Student extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
//	@SequenceGenerator(name = "id_sequence", sequenceName = "id_sequence", allocationSize = 1)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_sequence")
//	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Size(min=5, message="User Id must be 5 characters long")
	@Column(name = "NAME", length = 250)
	private String name;

	public Student() {
	}

	public Student(String name) {
		super();
		this.name = name;
	}

	public Student(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	@Override
	public Serializable getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String getEncodedId() {
		return null;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
