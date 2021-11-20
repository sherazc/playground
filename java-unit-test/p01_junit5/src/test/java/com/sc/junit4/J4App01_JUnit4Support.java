package com.sc.junit4;

import org.junit.Assert;
import org.junit.Test;

public class J4App01_JUnit4Support {

    // Able to run because of junit-vintage-engine dependency
    @Test
    public void myJunit4Test() {
        Assert.assertEquals(1, 1);
    }
}
