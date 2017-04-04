package com.bitsegment.services;

import junit.framework.Assert;

import org.junit.Test;

public class PaidTypeTest {

	@Test
	public void testPaidTypeFromValue() {
		Assert.assertEquals(PaidType.all, PaidType.fromValue("all"));
		Assert.assertEquals(PaidType.paid, PaidType.fromValue("paid"));
		Assert.assertEquals(PaidType.unpaid, PaidType.fromValue("unpaid"));
		
		Assert.assertEquals(PaidType.all, PaidType.fromValue("ALL"));
		Assert.assertEquals(PaidType.paid, PaidType.fromValue("PAID"));
		Assert.assertEquals(PaidType.unpaid, PaidType.fromValue("UNPAID"));
		
		Assert.assertEquals(PaidType.all, PaidType.fromValue(" ALL "));
		Assert.assertEquals(PaidType.paid, PaidType.fromValue(" PAID "));
		Assert.assertEquals(PaidType.unpaid, PaidType.fromValue(" UNPAID "));
		
		Assert.assertEquals(PaidType.all, PaidType.fromValue(null));
		Assert.assertEquals(PaidType.all, PaidType.fromValue(""));
		Assert.assertEquals(PaidType.all, PaidType.fromValue("Bad String"));
		
		
	} 
	
}

