package com.sc.java17b.eg02_clock_tutorial;

import java.time.Clock;
import java.time.Duration;

public class Eg04ClockMethodsOffset {
    public static void main(String[] args) {
        Clock clock01 = Clock.systemDefaultZone();

        // Alternative to System.currentTimeInMillis()
        System.out.println("Current time in millis - Clock.millis() - " + clock01.millis());

        // Created clock from base clock that is 2 hours faster
        Clock clock02 = Clock.offset(clock01, Duration.ofHours(2));

        // Created clock from base clock that is 10 minutes slower
        Clock clock03 = Clock.offset(clock01, Duration.ofMinutes(-10));
        System.out.println("clock01 = " + clock01.instant() + ", clock02 = " + clock02.instant() + ", clock03 = " + clock03.instant());


    }
}
