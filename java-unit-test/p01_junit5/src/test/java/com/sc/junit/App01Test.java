package com.sc.junit;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class App01Test {

    private App01 app01;

    @BeforeEach
    void setup() {
        app01 = new App01();
    }

    @Test
    @DisplayName("1 + 1 = 2")
    void shouldAdd() {
        Assertions.assertEquals(2, app01.add(1, 1));
    }
}
