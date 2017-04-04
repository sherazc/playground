package com.sc.bsp.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class ItemField extends BaseEntity implements Serializable {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Key id;

	@Column(name = "FIELD")
	private String field;

	public ItemField() {
		super();
	}

	public ItemField(Key id, String field) {
		super();
		this.id = id;
		this.field = field;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public Key getId() {
		return id;
	}

	public void setId(Key id) {
		this.id = id;
	}

	@Override
	public String getEncodedId() {
		return id != null ? KeyFactory.keyToString(id) : null;
	}

}
