package com.sc.cdb.services.common;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DateTimeCalculatorTest {

    private DateTimeCalculator dateTimeCalculator;

    @Before
    public void setUp() throws Exception {
        dateTimeCalculator = new DateTimeCalculatorImpl();
    }

    @Test
    public void isValid24Time() {
        assertTrue(dateTimeCalculator.isValid24Time("0:0"));
        assertTrue(dateTimeCalculator.isValid24Time("0:1"));
        assertTrue(dateTimeCalculator.isValid24Time("1:0"));
        assertTrue(dateTimeCalculator.isValid24Time("1:1"));
        assertTrue(dateTimeCalculator.isValid24Time("01:10"));
        assertTrue(dateTimeCalculator.isValid24Time("10:01"));
        assertTrue(dateTimeCalculator.isValid24Time("23:0"));
        assertTrue(dateTimeCalculator.isValid24Time("23:1"));
        assertTrue(dateTimeCalculator.isValid24Time("23:10"));
        assertTrue(dateTimeCalculator.isValid24Time("23:59"));
    }

    @Test
    public void isValid24Time_invalid() {
        assertFalse(dateTimeCalculator.isValid24Time(null));
        assertFalse(dateTimeCalculator.isValid24Time(""));
        assertFalse(dateTimeCalculator.isValid24Time(":"));
        assertFalse(dateTimeCalculator.isValid24Time("1"));
        assertFalse(dateTimeCalculator.isValid24Time(":1"));
        assertFalse(dateTimeCalculator.isValid24Time("1:"));
        assertFalse(dateTimeCalculator.isValid24Time("abc"));
        assertFalse(dateTimeCalculator.isValid24Time("1:1am"));
        assertFalse(dateTimeCalculator.isValid24Time(" 1:1"));
        assertFalse(dateTimeCalculator.isValid24Time("1:1 "));
        assertFalse(dateTimeCalculator.isValid24Time("24:00"));
        assertFalse(dateTimeCalculator.isValid24Time("10:60"));
    }

    @Test
    public void hourMinuteStringToInt() {
        int[] hourMinute = dateTimeCalculator.hourMinuteStringToInt("1:2");
        assertEquals(2, hourMinute.length);
        assertEquals(1, hourMinute[0]);
        assertEquals(2, hourMinute[1]);

        hourMinute = dateTimeCalculator.hourMinuteStringToInt("23:59");
        assertEquals(2, hourMinute.length);
        assertEquals(23, hourMinute[0]);
        assertEquals(59, hourMinute[1]);
    }

    @Test
    public void hourMinuteStringToInt_invalid() {
        assertNull(dateTimeCalculator.hourMinuteStringToInt(null));
        assertNull(dateTimeCalculator.hourMinuteStringToInt("abc"));
        assertNull(dateTimeCalculator.hourMinuteStringToInt(":"));
        assertNull(dateTimeCalculator.hourMinuteStringToInt("1:"));
        assertNull(dateTimeCalculator.hourMinuteStringToInt(":1"));
    }

    @Test
    public void hourMinuteIntToString() {
        assertEquals("00:00", dateTimeCalculator.hourMinuteIntToString(new int[]{0, 0}));
        assertEquals("01:02", dateTimeCalculator.hourMinuteIntToString(new int[]{1, 2}));
        assertEquals("23:59", dateTimeCalculator.hourMinuteIntToString(new int[]{23, 59}));
    }

    @Test
    public void hourMinuteIntToString_invalid() {
        assertNull(dateTimeCalculator.hourMinuteIntToString(null));
        assertNull(dateTimeCalculator.hourMinuteIntToString(new int[0]));
        assertNull(dateTimeCalculator.hourMinuteIntToString(new int[3]));
        assertNull(dateTimeCalculator.hourMinuteIntToString(new int[]{24, 0}));
        assertNull(dateTimeCalculator.hourMinuteIntToString(new int[]{10, 60}));
    }
}
