package com.sc.time

import java.time.Duration
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.temporal.ChronoUnit

fun main() {
    // Time-based time
    val instant1: Instant = Instant.parse("2001-09-11T00:00:00.00Z")
    val instant2: Instant = LocalDateTime.now().toInstant(ZoneOffset.UTC)

    val duration1:Duration = Duration.between(instant1, instant2)
    duration1.compareTo(Duration.between(instant1, instant2))

    println(duration1)
    println(duration1.isPositive)
    println(duration1.seconds)
    println(duration1.nano)

    val dateTime1:LocalDateTime = LocalDateTime.ofInstant(instant1, ZoneOffset.UTC)
    val dateTime2:LocalDateTime = LocalDateTime.now()

    val duration2:Duration = Duration.between(dateTime1, dateTime2)

    println(duration2.isPositive)
    println(duration2.seconds)
    println(duration2.nano)

    // Years and months can be used because they are an estimated duration.
    val duration3 = Duration.of(2, ChronoUnit.DAYS)
    val duration4 = Duration.ofDays(2)
    val duration5 = Duration.ofHours(2)
    val duration6 = Duration.ofMinutes(2)
    val duration7 = Duration.ofSeconds(2)
    val duration8 = Duration.ofMillis(2)
    val duration9 = Duration.ofNanos(2)


    // Duration format PnDTnHnMn.nS
    val duration10 = Duration.parse("P2DT2h2M2.22S")
    println(duration10)

    val dateTime3 = LocalDateTime.now().plus(duration10)
    println(dateTime3);

    val duration11 = Duration.ofDays(3)
        .plusDays(3)
        .plusHours(3)
        .plusHours(3)

    println(duration11)
    println(duration11.toHours()) // Total hours in duration
    println(duration11.toDaysPart()) // Only the day part in duration
    println(duration11.toMinutesPart()) // Only the minute part in duration
    println(duration11.toHoursPart()) // Only the hour part in duration

}