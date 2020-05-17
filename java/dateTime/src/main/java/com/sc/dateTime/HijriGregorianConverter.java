package com.sc.dateTime;

import java.time.LocalDate;
import java.time.chrono.HijrahChronology;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;

public class HijriGregorianConverter {

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

    public static String gregorianToHijrah(TemporalAccessor gregorianDate) {
        HijrahDate hijrahDate = HijrahChronology.INSTANCE.date(gregorianDate);
        return dateFormatter.format(hijrahDate);
    }

    public static String gregorianToHijrah(int year, int month, int dayOfMonth) {
        LocalDate gregorianDate = LocalDate.of(year, month, dayOfMonth);
        HijrahDate hijrahDate = HijrahChronology.INSTANCE.date(gregorianDate);
        return dateFormatter.format(hijrahDate);
    }

    public static String hijrahToGregorian(TemporalAccessor hijrahDate) {
        LocalDate localDate = IsoChronology.INSTANCE.date(hijrahDate);
        return dateFormatter.format(localDate);
    }

    public static String hijrahToGregorian(int prolepticYear, int month, int dayOfMonth) {
        HijrahDate hijrahDate = HijrahDate.of(prolepticYear, month, dayOfMonth);
        LocalDate localDate = IsoChronology.INSTANCE.date(hijrahDate);
        return dateFormatter.format(localDate);
    }


    public static void main(String[] args) {
        LocalDate todayLocal = LocalDate.now();
        HijrahDate todayHijrah = HijrahDate.now();

        System.out.println("Today gregorianToHijrah(): " + gregorianToHijrah(todayLocal));

        System.out.println("Birthday gregorianToHijrah(): " + gregorianToHijrah(1980, 9, 2));

        System.out.println("Today hijrahToGregorian(): " + hijrahToGregorian(todayHijrah));

        System.out.println("Birthday gregorianToHijrah(): " + hijrahToGregorian(1400, 10, 22));

    }
}
