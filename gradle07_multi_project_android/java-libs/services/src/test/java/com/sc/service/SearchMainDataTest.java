package com.sc.service;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class SearchMainDataTest {

    private SearchMainData searchMainData;

    @Before
    public void setUp() throws Exception {
        searchMainData = new SearchMainData();
    }

    @Test
    public void testFindByRecordNumber() throws Exception {
        String record = searchMainData.findByRecordNumber(1);
        assertNotNull(record);
    }

    @Test
    public void testFindByRecordNumberInvalid() throws Exception {
        String record = searchMainData.findByRecordNumber(-1);
        assertNull(record);
    }

    @Test
    public void testFindByRecordNumberCapitalize() {
        assertTrue(searchMainData.findByRecordNumberContains(2, "Line 02 Content"));
    }
}