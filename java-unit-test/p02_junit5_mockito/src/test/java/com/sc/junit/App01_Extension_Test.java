package com.sc.junit;

import com.sc.junit.service.Calculation;
import com.sc.junit.service.Calculator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class App01_Extension_Test {

    private Calculator calculator;
    /**
     * With JUnit5 and MockitoExtension, Mocks can be passed in constructor
     */
    App01_Extension_Test(@Mock Calculator calculator) {
        this.calculator = calculator;
    }

    @Test
    void shouldNotBeNull() {
        Assertions.assertNotNull(calculator);
    }


    /**
     * With JUnit5 and MockitoExtension mocks can be passed in test methods
     *
     */
    @Test
    void shouldCalculate(@Mock Calculation calculation) {
        Assertions.assertEquals(0, calculation.perform(1, 3));
    }

    /**
     * Mocks with generics
     */

    @Test
    void shouldCreateGenericMock(@Mock List<Integer> integers) {
        try {
            integers.add(1);
        } catch (NullPointerException e) {
            Assertions.fail(e.getMessage());
        }
    }
}
