package com.sc.sm.services;

import com.sc.sm.factory.ChaudhryStringMatchFactory;
import com.sc.sm.factory.StringMatchFactory;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by sheraz on 4/17/16.
 */
public class ChaudhryStringMatchTest {

    private StringMatchFactory factory;

    @Before
    public void setUp() throws Exception {
        factory = new ChaudhryStringMatchFactory();
    }

    @Test
    public void build_simpleStrings_setsXCorrectly() {
        StringMatch sm = factory.build("abb", "bba");
        assertEquals("abb", sm.getX());
    }

    @Test
    public void build_simpleStrings_setsYCorrectly() {
        StringMatch sm = factory.build("abb", "bba");
        assertEquals("bba", sm.getY());
    }

    @Test
    public void calculate_abb_bba_setsN1Correctly() {
        StringMatch sm = factory.build("abb", "bba").calculate();
        assertEquals(1, sm.getN1());
    }
/*
    Specific Examples
    f ("abc", "abc"): 3, 0
    f ("bca", "abc"): 0, 3
    f ("aab", "abb"): 2, 2
    f ("aab", "aba"): 1, 2
    f ("abc", "aaa"): 1, 1
    f ("aaa", "aaa"): 1, 1
*/

    @Test
    public void calculate_abc_abc() {
        StringMatch sm = factory.build("abc", "abc").calculate();
        assertEquals(3, sm.getN1());
        assertEquals(0, sm.getN2());
    }

    @Test
    public void calculate_bca_abc() {
        StringMatch sm = factory.build("bca", "abc").calculate();
        assertEquals(0, sm.getN1());
        assertEquals(3, sm.getN2());
    }

    @Test
    public void calculate_aab_abb() {
        StringMatch sm = factory.build("aab", "abb").calculate();
        assertEquals(2, sm.getN1());
        assertEquals(2, sm.getN2());
    }

    @Test
    public void calculate_aab_aba() {
        StringMatch sm = factory.build("aab", "aba").calculate();
        assertEquals(1, sm.getN1());
        assertEquals(2, sm.getN2());
    }

    @Test
    public void calculate_abc_aaa() {
        StringMatch sm = factory.build("abc", "aaa").calculate();
        assertEquals(1, sm.getN1());
        assertEquals(1, sm.getN2());
    }

    @Test
    public void calculate_aaa_aaa() {
        StringMatch sm = factory.build("aaa", "aaa").calculate();
        assertEquals(1, sm.getN1());
        assertEquals(1, sm.getN2());
    }

    @Test
    public void calculate_abcdef_dbcd() {
        StringMatch sm = factory.build("abcdef", "dbcd").calculate();
        assertEquals(3, sm.getN1());
        assertEquals(1, sm.getN2());
    }

    @Test
    public void calculate_null_null() {
        StringMatch sm = factory.build(null, null).calculate();
        assertEquals(0, sm.getN1());
        assertEquals(0, sm.getN2());
    }

    @Test
    public void calculate_blank_blank() {
        StringMatch sm = factory.build("", "").calculate();
        assertEquals(0, sm.getN1());
        assertEquals(0, sm.getN2());
    }

    @Test
    public void calculate_abc_blank() {
        StringMatch sm = factory.build("abc", "").calculate();
        assertEquals(0, sm.getN1());
        assertEquals(0, sm.getN2());
    }

    @Test
    public void calculate_blank_abc() {
        StringMatch sm = factory.build("", "abc").calculate();
        assertEquals(0, sm.getN1());
        assertEquals(0, sm.getN2());
    }
}