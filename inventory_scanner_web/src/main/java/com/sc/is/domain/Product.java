package com.sc.is.domain;

public class Product extends BaseEntity {

	private static final long serialVersionUID = 1L;

	public static final double TAX_RATE = 1.07;

	private Long id;
	private String code;
	private String sku;
	private String productName;
	private int quantity;
	private double retailPrice;
	private double discountPrice;

	public Product() {
	}

	public Product(Long id, String code, String sku, String productName,
			int quantity, double retailPrice, double discountPrice) {
		super();
		this.id = id;
		this.code = code;
		this.sku = sku;
		this.productName = productName;
		this.quantity = quantity;
		this.retailPrice = retailPrice;
		this.discountPrice = discountPrice;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getRetailPrice() {
		return retailPrice;
	}

	public void setRetailPrice(double retailPrice) {
		this.retailPrice = retailPrice;
	}

	public double getDiscountPrice() {
		if (this.discountPrice <= 0) {
			return this.retailPrice;
		}
		return discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}

}
