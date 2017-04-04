package com.sc.spring3.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "STORE_ITEM")
@Entity
public class StoreItem extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ITEM_ID")
	private Long id;
	private String name;
	private double price;

	public StoreItem() {
	}
	
	public StoreItem(Long id, String name, double price) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
	}



	@Override
	public Long getId() {
		return this.id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
