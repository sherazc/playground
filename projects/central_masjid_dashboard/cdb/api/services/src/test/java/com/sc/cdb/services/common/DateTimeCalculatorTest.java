package com.sc.cdb.services.common;

import com.sc.cdb.utils.CdbDateUtils;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DateTimeCalculatorTest {

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void isValid24Time() {
        assertTrue(CdbDateUtils.isValid24Time("0:0"));
        assertTrue(CdbDateUtils.isValid24Time("0:1"));
        assertTrue(CdbDateUtils.isValid24Time("1:0"));
        assertTrue(CdbDateUtils.isValid24Time("1:1"));
        assertTrue(CdbDateUtils.isValid24Time("01:10"));
        assertTrue(CdbDateUtils.isValid24Time("10:01"));
        assertTrue(CdbDateUtils.isValid24Time("23:0"));
        assertTrue(CdbDateUtils.isValid24Time("23:1"));
        assertTrue(CdbDateUtils.isValid24Time("23:10"));
        assertTrue(CdbDateUtils.isValid24Time("23:59"));
    }

    @Test
    public void isValid24Time_invalid() {
        assertFalse(CdbDateUtils.isValid24Time(null));
        assertFalse(CdbDateUtils.isValid24Time(""));
        assertFalse(CdbDateUtils.isValid24Time(":"));
        assertFalse(CdbDateUtils.isValid24Time("1"));
        assertFalse(CdbDateUtils.isValid24Time(":1"));
        assertFalse(CdbDateUtils.isValid24Time("1:"));
        assertFalse(CdbDateUtils.isValid24Time("abc"));
        assertFalse(CdbDateUtils.isValid24Time("1:1am"));
        assertFalse(CdbDateUtils.isValid24Time(" 1:1"));
        assertFalse(CdbDateUtils.isValid24Time("1:1 "));
        assertFalse(CdbDateUtils.isValid24Time("24:00"));
        assertFalse(CdbDateUtils.isValid24Time("10:60"));
    }

    @Test
    public void hourMinuteStringToInt() {
        int[] hourMinute = CdbDateUtils.hourMinuteStringToInt("1:2");
        assertEquals(2, hourMinute.length);
        assertEquals(1, hourMinute[0]);
        assertEquals(2, hourMinute[1]);

        hourMinute = CdbDateUtils.hourMinuteStringToInt("23:59");
        assertEquals(2, hourMinute.length);
        assertEquals(23, hourMinute[0]);
        assertEquals(59, hourMinute[1]);
    }

    @Test
    public void hourMinuteStringToInt_invalid() {
        assertNull(CdbDateUtils.hourMinuteStringToInt(null));
        assertNull(CdbDateUtils.hourMinuteStringToInt("abc"));
        assertNull(CdbDateUtils.hourMinuteStringToInt(":"));
        assertNull(CdbDateUtils.hourMinuteStringToInt("1:"));
        assertNull(CdbDateUtils.hourMinuteStringToInt(":1"));
    }

    @Test
    public void hourMinuteIntToString() {
        assertEquals("00:00", CdbDateUtils.hourMinuteIntToString(new int[]{0, 0}));
        assertEquals("01:02", CdbDateUtils.hourMinuteIntToString(new int[]{1, 2}));
        assertEquals("23:59", CdbDateUtils.hourMinuteIntToString(new int[]{23, 59}));
    }

    @Test
    public void hourMinuteIntToString_invalid() {
        assertNull(CdbDateUtils.hourMinuteIntToString(null));
        assertNull(CdbDateUtils.hourMinuteIntToString(new int[0]));
        assertNull(CdbDateUtils.hourMinuteIntToString(new int[3]));
        assertNull(CdbDateUtils.hourMinuteIntToString(new int[]{24, 0}));
        assertNull(CdbDateUtils.hourMinuteIntToString(new int[]{10, 60}));
    }
}
