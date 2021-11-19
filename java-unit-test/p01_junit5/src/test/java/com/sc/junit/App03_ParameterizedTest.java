package com.sc.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

class App03_ParameterizedTest {

    private static Stream<Arguments> argumentsForTest() {
        return Stream.of(
                Arguments.of(null, true),
                Arguments.of("", true),
                Arguments.of(" ", true),
                Arguments.of("Sheraz", false)
        );
    }

    @ParameterizedTest
    @MethodSource("argumentsForTest")
    void testBlank(String string, boolean expected) {
        Assertions.assertEquals(expected, isBlank(string));
    }

    private boolean isBlank(String string) {
        return string == null || string.trim().isBlank();
    }
}
