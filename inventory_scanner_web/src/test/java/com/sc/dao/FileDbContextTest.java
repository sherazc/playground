package com.sc.dao;

import java.util.List;

import org.apache.commons.lang.math.NumberUtils;
import org.junit.Before;
import org.junit.Test;

import com.sc.is.dao.FileDbContext;
import com.sc.is.domain.Product;
import com.sc.is.utils.BeanUtil;

public class FileDbContextTest {

	private FileDbContext target;

	@Before
	public void setUp() {
		target = (FileDbContext) BeanUtil.getTestBean("fileDbContext");
	}

	@Test
	public void testGetAllProducts() {
		List<Product> products = target.getProducts();
		String[] test = "sdf,,g,,".split(",");
		System.out.println(test);
		System.out.println(test.length);
		
		System.out.println(NumberUtils.toDouble(""));
	}
}
