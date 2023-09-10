package com.sc.pt.batch;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TimeCalculatorTest {

    private TimeCalculator target;

    @BeforeEach
    void setUp() {
        target = new TimeCalculator();
    }

    @Test
    void addMinutes() {
        assertEquals(null, target.addMinutes(null, 1));
        assertEquals("", target.addMinutes("", 1));
        assertEquals("1:00", target.addMinutes("1:00", 1));
        assertEquals("abc", target.addMinutes("abc", 1));

        assertEquals("12:01", target.addMinutes("12:00", 1));
        assertEquals("13:00", target.addMinutes("12:00", 60));
        // 24 hr = 1440 min
        assertEquals("23:59", target.addMinutes("23:59", 1440));
    }
}