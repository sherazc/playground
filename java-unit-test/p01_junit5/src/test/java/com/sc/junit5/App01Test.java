package com.sc.junit5;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class App01Test {

    @BeforeAll
    void beforeAll() {
        System.out.println("BeforeAll");
    }

    @BeforeEach
    void beforeEach() {
        System.out.println("BeforeEach");
    }

    @Test
    @DisplayName("1 + 1 = 2")
    void shouldAdd() {
        Assertions.assertEquals(2, add(1, 1));
    }

    int add(int a, int b) {
        return a + b;
    }

    @AfterEach
    void afterEach() {
        System.out.println("AfterEach");
    }

    @AfterAll
    void afterAll() {
        System.out.println("AfterAll");
    }
}
