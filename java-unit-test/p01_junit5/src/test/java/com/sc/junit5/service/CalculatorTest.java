package com.sc.junit5.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    private Calculator calculator;
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @Test
    void add() {
        assertEquals(0, calculator.add(0, 0));
        assertEquals(2, calculator.add(1, 1));
        assertEquals(-4, calculator.add(-2, -2));
    }
}