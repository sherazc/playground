package com.sc.is.mvc;

import java.util.Comparator;

import org.apache.commons.lang.StringUtils;

import com.sc.is.domain.Product;

public class ProductComparator implements Comparator<Product> {

	public static final int SORT_ISBN = 23;
	public static final int SORT_SKU = 54;
	public static final int SORT_PRODUCT_NAME = 656;
	public static final int SORT_RETAIL_PRICE = 2334;
	public static final int SORT_DISCOUNT_PRICE = 3424;

	private int field;
	private boolean acending;

	public ProductComparator(int field, boolean acending) {
		this.field = field;
		this.acending = acending;
	}

	@Override
	public int compare(Product o1, Product o2) {
		int sort = 0;
		switch (field) {
		case SORT_ISBN:
			if (acending) {
				sort = StringUtils.defaultString(o1.getCode()).compareTo(
						StringUtils.defaultString(o2.getCode()));
			} else {
				sort = StringUtils.defaultString(o2.getCode()).compareTo(
						StringUtils.defaultString(o1.getCode()));
			}
			break;
		case SORT_SKU:
			if (acending) {
				sort = StringUtils.defaultString(o1.getSku()).compareTo(
						StringUtils.defaultString(o2.getSku()));
			} else {
				sort = StringUtils.defaultString(o2.getSku()).compareTo(
						StringUtils.defaultString(o1.getSku()));
			}
			break;
		case SORT_PRODUCT_NAME:
			if (acending) {
				sort = StringUtils.defaultString(o1.getProductName()).compareTo(StringUtils.defaultString(o2.getProductName()));
			} else {
				sort = StringUtils.defaultString(o2.getProductName()).compareTo(StringUtils.defaultString(o1.getProductName()));
			}
			break;
		case SORT_RETAIL_PRICE:
			if (acending) {
				sort = new Double(o1.getRetailPrice()).compareTo(new Double(o2.getRetailPrice()));
			} else {
				sort = new Double(o2.getRetailPrice()).compareTo(new Double(o1.getRetailPrice()));
			}
			break;
		case SORT_DISCOUNT_PRICE:
			if (acending) {
				sort = new Double(o1.getDiscountPrice()).compareTo(new Double(o2.getDiscountPrice()));
			} else {
				sort = new Double(o2.getDiscountPrice()).compareTo(new Double(o1.getDiscountPrice()));
			}
			break;
		default:
			sort = 0;
			break;
		}
		return sort;
	}

}
