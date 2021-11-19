package com.sc.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class App06_assertAllTest {

    @Test
    public void should_assertAll() {
        int a = 10;

        Assertions.assertAll(
                "Assert All Valid positive number",
                () -> {
                    Assertions.assertTrue(a > 0);
                    Assertions.assertEquals(10, a);
                    Assertions.assertFalse(a % 2 == 1);
                }
        );

        Assertions.assertFalse(a < 1);
    }
}
