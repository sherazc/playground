package com.sc.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;

import java.util.stream.Stream;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class App03Test_Parameterized {

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
