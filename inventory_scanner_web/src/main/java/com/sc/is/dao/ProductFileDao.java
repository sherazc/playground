package com.sc.is.dao;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import com.sc.is.domain.Product;

@Component("productDao")
public class ProductFileDao implements ProductDao {

	private static final long serialVersionUID = 1L;

	@Inject
	@Named("fileDbContext")
	private FileDbContext context;
	
	public Product getProductByCode(String code) {
		List<Product> products = context.getProducts();
		Product productResult = null;
		for (Product product : products) {
			if (StringUtils.equalsIgnoreCase(code, product.getCode())) {
				productResult = product;
				break;
			}
		}
		return productResult;
	}

}
