package com.sc.junit5;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.time.Month;

class App04_ParameterizedTest {

    @ParameterizedTest
    @EnumSource(Month.class)
    void shouldMonthsBelow12(Month month) {
        Assertions.assertTrue(month.getValue() < 13);
    }
}
