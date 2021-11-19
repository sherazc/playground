package com.sc.junit;

import org.junit.Assert;
import org.junit.Test;

public class App05_junit4Test {

    // Able to run because of junit-vintage-engine dependency
    @Test
    public void myJunit4Test() {
        Assert.assertEquals(1, 1);
    }
}
