package com.sc.equifax;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class AppTest {

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void mostFrequentNumber_validNums() {
        int[] nums = new int[]{1, 5, 8, 2, 7, 8, 1, 9, 8, 2};
        Assert.assertEquals(8, App.mostFrequentNumber(nums));
    }

    @Test
    public void mostFrequentNumber_inValidNums() {
        Assert.assertEquals(-1, App.mostFrequentNumber(null));
        Assert.assertEquals(-1, App.mostFrequentNumber(new int[0]));
    }

    @Test
    public void mostFrequentNumber_uniqueNums() {
        Assert.assertEquals(1, App.mostFrequentNumber(new int[]{1, 2, 3}));
        Assert.assertEquals(1, App.mostFrequentNumber(new int[]{3, 2, 1}));
        Assert.assertEquals(1, App.mostFrequentNumber(new int[]{2, 1, 3}));
    }
}