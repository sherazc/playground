package com.sc.util;

import org.junit.Test;

import static org.junit.Assert.*;

public class WebUtilsTest {

    @Test
    public void testCleanupWordSpecialCharacters() {
        assertNull(WebUtils.cleanupWordSpecialCharacters(null));
        assertEquals("", WebUtils.cleanupWordSpecialCharacters(""));
        assertEquals("abc", WebUtils.cleanupWordSpecialCharacters("abc"));
        assertEquals("abcxyz", WebUtils.cleanupWordSpecialCharacters("- abc:xyz=&"));
        assertEquals("", WebUtils.cleanupWordSpecialCharacters("12345!@#$0923"));
        assertEquals("abc", WebUtils.cleanupWordSpecialCharacters("123a45!@b#$092c)(*^%3"));
    }

}