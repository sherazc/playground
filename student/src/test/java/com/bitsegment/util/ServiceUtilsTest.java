package com.bitsegment.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import junit.framework.Assert;

import org.junit.Test;

public class ServiceUtilsTest {

	@Test
	public void testConvertMonth() {
		Calendar calendar = Calendar.getInstance();
		int currentMonth = calendar.get(Calendar.MONTH);
		Assert.assertEquals(currentMonth, ServiceUtils.convertMonth("asdf"));
		Assert.assertEquals(0, ServiceUtils.convertMonth("0"));
		Assert.assertEquals(currentMonth, ServiceUtils.convertMonth("2134234"));
		Assert.assertEquals(currentMonth, ServiceUtils.convertMonth(null));
		Assert.assertEquals(currentMonth, ServiceUtils.convertMonth("-12"));
	}

	@Test
	public void testConvertYear() {
		Calendar calendar = Calendar.getInstance();
		int currentYear = calendar.get(Calendar.YEAR);
		Assert.assertEquals(2000, ServiceUtils.convertYear("2000"));
		Assert.assertEquals(2020, ServiceUtils.convertYear("2020"));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear("1999"));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear("2021"));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear("asdf"));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear("0"));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear("2050"));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear(null));
		Assert.assertEquals(currentYear, ServiceUtils.convertYear("1800"));
	}
	
	//@Test
	public void testGetSecurityCode() {
		SimpleDateFormat CODE_DATE_FORMAT = new SimpleDateFormat("yyyyMMddHHmm-mmHHddMMyyyy"); 
		Assert.assertEquals(CODE_DATE_FORMAT.format(new Date()), ServiceUtils.getSecurityCode());
	}
}
