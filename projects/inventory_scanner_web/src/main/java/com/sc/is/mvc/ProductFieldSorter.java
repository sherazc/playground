package com.sc.is.mvc;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.sc.is.domain.Product;

@Component("productFieldSorter")
public class ProductFieldSorter implements Serializable {

	private static final long serialVersionUID = 1L;
	private List<Product> products;
	private boolean isbnAscending;
	private boolean skuAscending;
	private boolean productNameAscending;
	private boolean retailPriceAscending;
	private boolean discountPriceAscending;

	public ProductFieldSorter() {
	}

	public void sortByIsbn() {
		Collections.sort(this.getProducts(), new ProductComparator(
				ProductComparator.SORT_ISBN, isbnAscending));
		isbnAscending = !isbnAscending;
	}

	public void sortBySku() {
		Collections.sort(this.getProducts(), new ProductComparator(
				ProductComparator.SORT_SKU, skuAscending));
		skuAscending = !skuAscending;
	}

	public void sortByProductName() {
		Collections.sort(this.getProducts(), new ProductComparator(
				ProductComparator.SORT_PRODUCT_NAME, productNameAscending));
		productNameAscending = !productNameAscending;
	}

	public void sortByRetailPrice() {
		Collections.sort(this.getProducts(), new ProductComparator(
				ProductComparator.SORT_RETAIL_PRICE, retailPriceAscending));
		retailPriceAscending = !retailPriceAscending;
	}

	public void sortByDiscountPrice() {
		Collections.sort(this.getProducts(), new ProductComparator(
				ProductComparator.SORT_DISCOUNT_PRICE, discountPriceAscending));
		discountPriceAscending = !discountPriceAscending;
	}

	private List<Product> getProducts() {
		if (this.products == null) {
			return new ArrayList<Product>();
		} else {
			return products;
		}
	}

	public void setAttendees(List<Product> products) {
		this.products = products;
	}

}
