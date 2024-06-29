package com.sc.time

fun main() {
    /*
    https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/temporal/TemporalAccessor.html
    https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/temporal/Temporal.html

    In new Java Date & Time api there are several date
    All of them implements TemporalAccessor, Temporal interfaces
    All the implementations are immutable.

    Example of Java Date & Time classes:

    DayOfWeek, HijrahDate, HijrahEra, Instant, IsoEra, JapaneseDate, JapaneseEra,
    LocalDate, LocalDateTime, LocalTime, MinguoDate, MinguoEra, Month, MonthDay,
    OffsetDateTime, OffsetTime, ThaiBuddhistDate, ThaiBuddhistEra, Year,
    YearMonth, ZonedDateTime, ZoneOffset

    TemporalAccessor: Uses TemporalField to get the value of date using get() method.
    Temporal: Uses TemporalUnit, TemporalAdjuster, TemporalField to change the values of date time classes.

    TemporalUnit is implemented by enum ChronoUnit
    TemporalField is implemented by enum ChronoField
    TemporalAdjuster is implemented by many classes.
    */
}