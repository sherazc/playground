package com.sc.dateTime;

import java.time.LocalDate;
import java.time.Month;
import java.time.chrono.HijrahChronology;
import java.time.chrono.JapaneseChronology;
import java.time.chrono.MinguoChronology;
import java.time.chrono.ThaiBuddhistChronology;

/**
 * Hello world!
 *
 *
 *
 *
 *
 * LocalDate today = LocalDate.now();
 * LocalDate payday = today.with(TemporalAdjusters.lastDayOfMonth()).minusDays(2);
 *
 *
 * ##################
 *
 * Imutable. no set metods. Creates new on arithimatics. created using of(), from(), or with()
 * LocalDate dateOfBirth = LocalDate.of(2012, Month.MAY, 14);
 * LocalDate firstBirthday = dateOfBirth.plusYears(1);
 *
 *
 * ####################
 *
 * Packages
 *
 * java.time
 * The core of the API for representing date and time. It includes classes for date, time, date and time combined, time zones, instants, duration, and clocks. These classes are based on the calendar system defined in ISO-8601, and are immutable and thread-safe.
 * java.time.chrono
 * The API for representing calendar systems other than the default ISO-8601. You can also define your own calendar system. This tutorial does not cover this package in any detail.
 * java.time.format
 * Classes for formatting and parsing dates and times.
 * java.time.temporal
 * Extended API, primarily for framework and library writers, allowing interoperations between the date and time classes, querying, and adjustment. Fields (TemporalField and ChronoField) and units (TemporalUnit and ChronoUnit) are defined in this package.
 * java.time.zone
 * Classes that support time zones, offsets from time zones, and time zone rules. If working with time zones, most developers will need to use only ZonedDateTime, and ZoneId or ZoneOffset.
 *
 * ###################
 *
 * Methods
 *
 * Prefix	Method Type	Use
 * of	static factory	Creates an instance where the factory is primarily validating the input parameters, not converting them.
 * from	static factory	Converts the input parameters to an instance of the target class, which may involve losing information from the input.
 * parse	static factory	Parses the input string to produce an instance of the target class.
 * format	instance	Uses the specified formatter to format the values in the temporal object to produce a string.
 * get	instance	Returns a part of the state of the target object.
 * is	instance	Queries the state of the target object.
 * with	instance	Returns a copy of the target object with one element changed; this is the immutable equivalent to a set method on a JavaBean.
 * plus	instance	Returns a copy of the target object with an amount of time added.
 * minus	instance	Returns a copy of the target object with an amount of time subtracted.
 * to	instance	Converts this object to another type.
 * at	instance	Combines this object with another.
 *
 *
 * ##################################
 *
 *
 *
 */
public class App {
    public static void main(String[] args) {
        //LocalDate date = LocalDate.of(1996, Month.OCTOBER, 29);

        LocalDate date = LocalDate.now();

        System.out.printf("%s%n",
                StringConverter.toString(date, JapaneseChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.toString(date, MinguoChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.toString(date, ThaiBuddhistChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.toString(date, HijrahChronology.INSTANCE));


    }
}