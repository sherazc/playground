package com.sc.gradle;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class MyServiceATest {

    private MyServiceA myServiceA = null;

    @Before
    public void init() {
        myServiceA = new MyServiceA();
    }

    @Test
    public void testSumStringNumsValid() {
        String result = myServiceA.sumStringNums("4", "5");
        Assert.assertEquals("numA + numB = 9", result);
    }

    @Test
    public void testSumStringNumsInvalid() {
        String result = myServiceA.sumStringNums("a", "5");
        //Assert.assertEquals("Bad input. numA=5 numB=5", result);
        Assert.assertEquals("Bad input. numA=a numB=5", result);
    }
}