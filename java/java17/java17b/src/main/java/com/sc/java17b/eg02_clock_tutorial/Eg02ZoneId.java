package com.sc.java17b.eg02_clock_tutorial;

import java.time.ZoneId;

public class Eg02ZoneId {
    public static void main(String[] args) {
        // 28 available timezones with short IDs
        // Not sure why it is 28 instead of 24 time zones
        ZoneId.SHORT_IDS.forEach((k, v) -> System.out.println(k + "=" + v));

        System.out.println("===================");
        // All available ZoneId
        // Over 600 cities around the world
        ZoneId.getAvailableZoneIds()
                .stream()
                .forEach(System.out::println);

        System.out.println("===================");
        // Current system default ZoneId
        System.out.println(ZoneId.systemDefault());
    }
}
