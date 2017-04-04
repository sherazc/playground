package com.sc.rotd.api.utils;

import org.junit.Assert;
import org.junit.Test;

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

    @Test
    public void testDisplayNameToIndexName() {
        String result = CommonUtils.displayNameToIndexName("my display");
        Assert.assertEquals("my_display", result);

        result = CommonUtils.displayNameToIndexName(" ");
        Assert.assertEquals("_", result);

        result = CommonUtils.displayNameToIndexName(null);
        Assert.assertNull(result);

        result = CommonUtils.displayNameToIndexName("my display translation");
        Assert.assertEquals("my_display_translation", result);
    }

    @Test
    public void testIndexNameToFileName() {
        String result = CommonUtils.indexNameToFileName("my_index");
        Assert.assertEquals("my_index.txt", result);

        result = CommonUtils.indexNameToFileName(null);
        Assert.assertNull(result);

        result = CommonUtils.indexNameToFileName(" ");
        Assert.assertEquals(" .txt", result);
    }

    @Test
    public void testDisplayNameToFileName() {
        String result = CommonUtils.displayNameToFileName("my display name");
        Assert.assertEquals("my_display_name.txt", result);

        result = CommonUtils.displayNameToFileName(null);
        Assert.assertNull(result);

        result = CommonUtils.displayNameToFileName(" ");
        Assert.assertEquals("_.txt", result);
    }
}