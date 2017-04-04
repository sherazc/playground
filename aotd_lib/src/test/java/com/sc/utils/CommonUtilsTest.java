package com.sc.utils;

import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.*;

public class CommonUtilsTest {

    @Test
    public void testSplitLine() throws Exception {
        String rawLine = "1|2|text";

        String[] lineItems = CommonUtils.splitLine(rawLine);

        Assert.assertNotNull(lineItems);

        Assert.assertEquals(3, lineItems.length);
        Assert.assertEquals("1", lineItems[0]);
        Assert.assertEquals("2", lineItems[1]);
        Assert.assertEquals("text", lineItems[2]);

    }
}