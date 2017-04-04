package com.sc.is.mvc;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;

import com.sc.is.dao.FileDbContext;
import com.sc.is.dao.ProductDao;
import com.sc.is.domain.Product;

@ManagedBean(name = "inventoryController")
@SessionScoped
public class InventoryController implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty("#{productDao}")
	private ProductDao productDao;

	@ManagedProperty("#{productFieldSorter}")
	private ProductFieldSorter productFieldSorter;

	@ManagedProperty("#{fileDbContext}")
	private FileDbContext fileDbContext;

	private List<Product> currentProducts = new ArrayList<Product>();

	private String scanCode;

	private String errorMessage;

	public String removeProduct(Product product) {
		currentProducts.remove(product);
		return null;
	}

	public String refreshDb() {
		this.fileDbContext.setRefreshProducts(true);
		this.resetCurrentProducts();
		return null;
	}

	public String searchScanCode() {
		Product foundProduct = productDao.getProductByCode(scanCode);
		if (foundProduct != null) {
			currentProducts.add(foundProduct);
			scanCode = null;
			errorMessage = null;
		} else {
			errorMessage = scanCode + " Not found.";
		}
		return null;
	}

	public double getTotalRetailPrice() {
		double result = 0;
		for (Product product : currentProducts) {
			result += product.getRetailPrice();
		}
		return result;
	}

	public double getTotalRetailPlusTax() {
		double result = this.getTotalRetailPrice();
		return result * Product.TAX_RATE;
	}

	public double getTotalDiscountPlusTax() {
		double result = this.getTotalDiscountPrice();
		return result * Product.TAX_RATE;
	}

	public double getTotalDiscountPrice() {
		double result = 0;
		for (Product product : currentProducts) {
			result += product.getDiscountPrice();
		}
		return result;
	}

	public void resetCurrentProducts() {
		this.setCurrentProducts(new ArrayList<Product>());
		scanCode = null;
	}

	public String getScanCode() {
		return scanCode;
	}

	public void setScanCode(String scanCode) {
		this.scanCode = scanCode;
	}

	public ProductDao getProductDao() {
		return productDao;
	}

	public void setProductDao(ProductDao productDao) {
		this.productDao = productDao;
	}

	public List<Product> getCurrentProducts() {
		this.productFieldSorter.setAttendees(currentProducts);
		return currentProducts;
	}

	public void setCurrentProducts(List<Product> currentProducts) {
		this.currentProducts = currentProducts;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public ProductFieldSorter getProductFieldSorter() {
		return productFieldSorter;
	}

	public void setProductFieldSorter(ProductFieldSorter productFieldSorter) {
		this.productFieldSorter = productFieldSorter;
	}

	public FileDbContext getFileDbContext() {
		return fileDbContext;
	}

	public void setFileDbContext(FileDbContext fileDbContext) {
		this.fileDbContext = fileDbContext;
	}
}
