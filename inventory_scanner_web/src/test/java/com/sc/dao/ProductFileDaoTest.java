package com.sc.dao;

import org.junit.Before;
import org.junit.Test;

import com.sc.is.dao.ProductDao;
import com.sc.is.domain.Product;
import com.sc.is.utils.BeanUtil;

public class ProductFileDaoTest {

	private ProductDao target;

	@Before
	public void setUp() {
		target = (ProductDao) BeanUtil.getTestBean("productDao");
	}

	@Test
	public void testGetProductByCode() {
		Product product = target.getProductByCode("3423434534");
		System.out.println(product);
	}
}
