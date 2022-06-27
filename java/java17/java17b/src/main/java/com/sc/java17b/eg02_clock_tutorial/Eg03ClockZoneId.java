package com.sc.java17b.eg02_clock_tutorial;

import java.time.Clock;
import java.time.ZoneId;

public class Eg03ClockZoneId {
    public static void main(String[] args) {
        // Create a clock for a particular ZoneId
        Clock clock01 = Clock.system(ZoneId.of("Asia/Karachi"));
        System.out.println(clock01);
        System.out.println(clock01.instant());
    }
}
