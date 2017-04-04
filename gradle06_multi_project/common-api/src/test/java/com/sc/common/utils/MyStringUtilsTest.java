package com.sc.common.utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class MyStringUtilsTest {


    @Test
    public void testIsBlank() throws Exception {
        assertTrue(MyStringUtils.isBlank(null));
        assertTrue(MyStringUtils.isBlank("   "));
        assertTrue(MyStringUtils.isBlank("  \n \r \t "));
        assertFalse(MyStringUtils.isBlank(" abcd "));
    }

    @Test
    public void testIsNotBlank() throws Exception {
        assertTrue(MyStringUtils.isNotBlank(" abcd "));
        assertFalse(MyStringUtils.isNotBlank(" \n \r \t "));
        assertFalse(MyStringUtils.isNotBlank(null));
    }
}