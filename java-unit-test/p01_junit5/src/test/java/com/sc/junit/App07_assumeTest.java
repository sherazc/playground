package com.sc.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;

public class App07_assumeTest {

    @Test
    public void should_assume() {
        int a = 1;
        int b = 2;

        Assertions.assertTrue(b > 1); // This will run
        Assumptions.assumeTrue(a > 0);
        // If assume fails. remainder of test will skip.
        // Unit test will be marked as "skipped".
        Assumptions.assumeTrue(b > 10);

        // This will not run
        Assertions.fail("This will nto run because assume failed.");
    }
}
