package com.sc.cdb.services.common;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DateTimeCalculatorTest {

    private DateTimeCalculator dateTimeCalculator;

    @Before
    public void setUp() throws Exception {
        dateTimeCalculator = new DateTimeCalculator();
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
}