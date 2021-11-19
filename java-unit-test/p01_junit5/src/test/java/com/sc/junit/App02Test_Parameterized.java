package com.sc.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

class App02Test_Parameterized {

    @ParameterizedTest(name = "isOdd {0}")
    @ValueSource(ints = {1,3,5})
    void isOdd(int number) {
        Assertions.assertEquals(1, number % 2);
    }

    @ParameterizedTest
    @NullSource
    void isNull(String string) {
        Assertions.assertNull(string);
    }

    @ParameterizedTest(name = "{0} + {1} = {2}")
    @CsvSource({
            "1, 1, 2",
            "2, 3, 5",
            "-5, 2, -3",
            "0, 0, 0"
    })
    void shouldAddCsv(int first, int second, int expected) {
        App01 app01 = new App01();
        Assertions.assertEquals(expected, app01.add(first, second));
    }

    @ParameterizedTest(name = "{0} + {1} = {2}")
    @CsvFileSource(resources = "/App01_add_data.csv")
    void shouldAddCsvFile(int first, int second, int expected) {
        App01 app01 = new App01();
        Assertions.assertEquals(expected, app01.add(first, second));
    }
}
