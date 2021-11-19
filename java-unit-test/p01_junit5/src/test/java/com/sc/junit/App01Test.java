package com.sc.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class App01Test {

    @Test
    @DisplayName("1 + 1 = 2")
    void shouldAdd() {
        Assertions.assertEquals(2, add(1, 1));
    }

    int add(int a, int b) {
        return a + b;
    }
}
