package com.sc.is.dao;

import java.io.BufferedReader;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.math.NumberUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.sc.is.domain.Product;
import com.sc.is.utils.ClasspathFileReaderUtil;

@Component("fileDbContext")
public class FileDbContext implements Serializable{

	private static final long serialVersionUID = 1L;

	private static final String DB_FILE = "kitab_house_price.csv";

	private static final Log LOG = LogFactory.getLog(FileDbContext.class);

	private List<Product> products;

	private boolean refreshProducts;

	public List<Product> getProducts() {
		if (products == null || refreshProducts) {
			refreshProducts = false;
			products = new ArrayList<Product>();
			try {
				BufferedReader reader = ClasspathFileReaderUtil.reader(DB_FILE);
				String line = reader.readLine();
				while ((line = reader.readLine()) != null) {
					String[] recordArray = line.split(",");
					Product product = createProduct(recordArray);
					products.add(product);
				}
			} catch (Exception e) {
				LOG.error("Error readering " + DB_FILE, e);
			}
		}
		return products;
	}

	private Product createProduct(String[] recordArray) {
		Product product = new Product();
		try {
			product.setId(System.currentTimeMillis() * ((int)Math.random() * 10));
			product.setCode(recordArray[0]);
			product.setSku(recordArray[1]);
			product.setProductName(recordArray[2]);
			product.setQuantity(NumberUtils.toInt(recordArray[3]));
			product.setRetailPrice(NumberUtils.toDouble(recordArray[4]));
			product.setDiscountPrice(NumberUtils.toDouble(recordArray[5]));
		} catch (Exception e) {
		}
		return product;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public boolean isRefreshProducts() {
		return refreshProducts;
	}

	public void setRefreshProducts(boolean refreshProducts) {
		this.refreshProducts = refreshProducts;
	}

}
