package com.sc.junit;

import org.junit.jupiter.api.*;

@DisplayName("Nested Tests A and B")
class App08_nestedTest {

    @Nested
    @DisplayName("Test A")
    class ClassATest {
        @Test
        @DisplayName("Test A1")
        void testA1(){
            Assertions.assertEquals(1, 1);
        }
    }

    @Nested
    @DisplayName("Test B1")
    class ClassBTest {
        @Test
        @DisplayName("Test B1")
        void testB1(){
            Assertions.assertEquals(2, 2);
        }
    }
}
