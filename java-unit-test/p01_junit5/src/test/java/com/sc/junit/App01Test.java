package com.sc.junit;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;

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

    @ParameterizedTest(name = "{0} + {1} = {2}")
    @CsvSource({
            "1, 1, 2",
            "2, 3, 5",
            "-5, 2, -3",
            "0, 0, 0"
    })
    void shouldAddCsv(int first, int second, int expected) {
        Assertions.assertEquals(expected, app01.add(first, second));
    }

    @ParameterizedTest(name = "{0} + {1} = {2}")
    @CsvFileSource(resources = "/App01_add_data.csv")
    void shouldAddCsvFile(int first, int second, int expected) {
        Assertions.assertEquals(expected, app01.add(first, second));
    }
}
