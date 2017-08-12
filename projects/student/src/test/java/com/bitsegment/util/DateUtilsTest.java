package com.bitsegment.util;

import java.util.Calendar;
import java.util.Date;

import junit.framework.Assert;

import org.junit.Test;

public class DateUtilsTest {

	@Test
	public void testdateToMonthYearString() {
		String target = DateUtils.dateToMonthYearString(null);
		Assert.assertNotNull(target);
		Calendar calendar = Calendar.getInstance();
		calendar.set(2007, 7, 1);
		target = DateUtils.dateToMonthYearString(calendar.getTime());
		Assert.assertNotNull(target);
		Assert.assertEquals("Aug, 2007", target);
	}
	
	@Test
	public void testStringMonthYearToDate() {
		Date target = DateUtils.stringMonthYearToDate("");
		Assert.assertNotNull(target);
		target = DateUtils.stringMonthYearToDate(null);
		Assert.assertNotNull(target);
		target = DateUtils.stringMonthYearToDate("abcd");
		Assert.assertNotNull(target);
		target = DateUtils.stringMonthYearToDate("Oct, 2008");
		Assert.assertNotNull(target);

		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(target.getTime());

		Assert.assertEquals(0, calendar.get(Calendar.MILLISECOND));
		Assert.assertEquals(0, calendar.get(Calendar.SECOND));
		Assert.assertEquals(0, calendar.get(Calendar.MINUTE));
		Assert.assertEquals(0, calendar.get(Calendar.HOUR));

		Assert.assertEquals(1, calendar.get(Calendar.DATE));
		Assert.assertEquals(9, calendar.get(Calendar.MONTH));
		Assert.assertEquals(2008, calendar.get(Calendar.YEAR));
	}

	@Test
	public void testGetMonthStartDate() {
		Date target = DateUtils.getMonthStartDate(1, 2004);

		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(target.getTime());

		Assert.assertEquals(999, calendar.get(Calendar.MILLISECOND));
		Assert.assertEquals(59, calendar.get(Calendar.SECOND));
		Assert.assertEquals(59, calendar.get(Calendar.MINUTE));
		Assert.assertEquals(11, calendar.get(Calendar.HOUR));

		Assert.assertEquals(31, calendar.get(Calendar.DATE));
		Assert.assertEquals(0, calendar.get(Calendar.MONTH));
		Assert.assertEquals(2004, calendar.get(Calendar.YEAR));
	}

	@Test
	public void testGetMonthEndDate() {
		Date target = DateUtils.getMonthEndDate(1, 2004);

		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(target.getTime());

		Assert.assertEquals(999, calendar.get(Calendar.MILLISECOND));
		Assert.assertEquals(59, calendar.get(Calendar.SECOND));
		Assert.assertEquals(59, calendar.get(Calendar.MINUTE));
		Assert.assertEquals(11, calendar.get(Calendar.HOUR));

		Assert.assertEquals(29, calendar.get(Calendar.DATE));
		Assert.assertEquals(1, calendar.get(Calendar.MONTH));
		Assert.assertEquals(2004, calendar.get(Calendar.YEAR));
	}
}
