package com.sc.cdb.services.common;

import com.sc.cdb.utils.DateUtils;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DateTimeCalculatorTest {

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void isValid24Time() {
        assertTrue(DateUtils.isValid24Time("0:0"));
        assertTrue(DateUtils.isValid24Time("0:1"));
        assertTrue(DateUtils.isValid24Time("1:0"));
        assertTrue(DateUtils.isValid24Time("1:1"));
        assertTrue(DateUtils.isValid24Time("01:10"));
        assertTrue(DateUtils.isValid24Time("10:01"));
        assertTrue(DateUtils.isValid24Time("23:0"));
        assertTrue(DateUtils.isValid24Time("23:1"));
        assertTrue(DateUtils.isValid24Time("23:10"));
        assertTrue(DateUtils.isValid24Time("23:59"));
    }

    @Test
    public void isValid24Time_invalid() {
        assertFalse(DateUtils.isValid24Time(null));
        assertFalse(DateUtils.isValid24Time(""));
        assertFalse(DateUtils.isValid24Time(":"));
        assertFalse(DateUtils.isValid24Time("1"));
        assertFalse(DateUtils.isValid24Time(":1"));
        assertFalse(DateUtils.isValid24Time("1:"));
        assertFalse(DateUtils.isValid24Time("abc"));
        assertFalse(DateUtils.isValid24Time("1:1am"));
        assertFalse(DateUtils.isValid24Time(" 1:1"));
        assertFalse(DateUtils.isValid24Time("1:1 "));
        assertFalse(DateUtils.isValid24Time("24:00"));
        assertFalse(DateUtils.isValid24Time("10:60"));
    }

    @Test
    public void hourMinuteStringToInt() {
        int[] hourMinute = DateUtils.hourMinuteStringToInt("1:2");
        assertEquals(2, hourMinute.length);
        assertEquals(1, hourMinute[0]);
        assertEquals(2, hourMinute[1]);

        hourMinute = DateUtils.hourMinuteStringToInt("23:59");
        assertEquals(2, hourMinute.length);
        assertEquals(23, hourMinute[0]);
        assertEquals(59, hourMinute[1]);
    }

    @Test
    public void hourMinuteStringToInt_invalid() {
        assertNull(DateUtils.hourMinuteStringToInt(null));
        assertNull(DateUtils.hourMinuteStringToInt("abc"));
        assertNull(DateUtils.hourMinuteStringToInt(":"));
        assertNull(DateUtils.hourMinuteStringToInt("1:"));
        assertNull(DateUtils.hourMinuteStringToInt(":1"));
    }

    @Test
    public void hourMinuteIntToString() {
        assertEquals("00:00", DateUtils.hourMinuteIntToString(new int[]{0, 0}));
        assertEquals("01:02", DateUtils.hourMinuteIntToString(new int[]{1, 2}));
        assertEquals("23:59", DateUtils.hourMinuteIntToString(new int[]{23, 59}));
    }

    @Test
    public void hourMinuteIntToString_invalid() {
        assertNull(DateUtils.hourMinuteIntToString(null));
        assertNull(DateUtils.hourMinuteIntToString(new int[0]));
        assertNull(DateUtils.hourMinuteIntToString(new int[3]));
        assertNull(DateUtils.hourMinuteIntToString(new int[]{24, 0}));
        assertNull(DateUtils.hourMinuteIntToString(new int[]{10, 60}));
    }
}
