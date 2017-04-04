package com.sc.dao;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

import com.sc.domain.Zip;
import com.sc.utils.BeanUtil;

public class ZipDaoTest {

	private ZipDao target;
	
	@Before
	public void setUp() {
		target = (ZipDao) BeanUtil.getTestBean("zipStaticContext");
	}
	
	@Test
	public void testGetByZipCode() {
		Zip zip = target.getByZipCode("30004");
//		Assert.assertNotNull(zip);
//		Assert.assertEquals("ALPHARETTA", zip.getCity());
//		Assert.assertEquals("Georgia", zip.getState().getState());
//		Assert.assertEquals("GA", zip.getState().getStateAbr());
	}
}
