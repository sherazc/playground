package com.sc.java17b.eg02_clock_tutorial;

import java.time.Clock;
import java.time.Instant;

public class Eg01ClockSystemDefaultZone {

    public static void main(String[] args) throws Exception {
        /**
         *
         * https://www.baeldung.com/java-clock
         * https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html
         *
         * java.time.Clock can be used to get date-time with time-zone.
         * This class is alternate to using System.currentTimeMillis() and TimeZone.getDefault()
         *
         * This is an abstract class that has several sub implementations:
         * FixedClock
         * OffsetClock
         * SourceClock
         * SystemClock
         * SystemInstantSource
         * TickClock
         *
         * E.g. Use this Clock.systemDefaultZone() method to get system current date-time
         * with default system time-zone
         */
        Clock clock01 = Clock.systemDefaultZone();

        // Notice the implementation in the system out
        System.out.println(clock01);

        // Returns the time-zone
        System.out.println(clock01.getZone());

        /**
         * To get Clock's date-time we have to get it's Instant
         *
         * Instant is also used to get data-time. But once obtained it's date-time do not change.
         *
         */
        Instant instant01 = clock01.instant();
        System.out.println(instant01);
        Thread.sleep(2000);
        /**
         * Notice even after sleeping for some time it will not change.
         */
        System.out.println(instant01);

        /**
         * But the next time we call .instant() it returns the fresh new instant with current date-time.
         */
        System.out.println(clock01.instant());
    }
}
