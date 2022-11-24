package com.sc.java17b.eg02_clock_tutorial;

import java.time.Clock;
import java.time.Duration;

public class Eg05ClockMethodsTick {

    /**
     * Clock.tick(baseClock, Duration) method increments time every duration.
     *
     * In below example Clock ticks time every 2 seconds.
     *
     *
     * @param args
     * @throws Exception
     */

    public static void main(String[] args) throws Exception {
        Clock clock01 = Clock.systemDefaultZone();
        Clock tickAfterEvery2Seconds = Clock.tick(clock01, Duration.ofSeconds(2));

        for (int i = 0; i < 20; i++) {
            System.out.println(tickAfterEvery2Seconds.instant().toString());
            Thread.sleep(1000);
        }
    }
}
