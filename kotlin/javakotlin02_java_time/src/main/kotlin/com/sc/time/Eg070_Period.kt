package com.sc.time

import java.time.LocalDate
import java.time.Period

fun main() {
    /*
    Period is used to calculate time between 2 dates
    And add it to LocalDate
     */

    val now = LocalDate.now()
    val nextDate = now.plusMonths(5).plusYears(2).plusDays(40)
    val period1: Period = Period.between(now, nextDate)
    println("period: $period1")
    println("period days: ${period1.days}")
    println("period months: ${period1.months}")
    println("period years: ${period1.years}")

    val period2 = Period.ofDays(5)
        .plusMonths(2)
        .plusYears(4)
    println(period2.isNegative)

    val period3 = Period.of(3, 9, 20)
    println(period3.isZero)

    val period4 = Period.parse("P2Y3M5D")
    val dateTime1:LocalDate = period4.addTo(LocalDate.now()) as LocalDate
    println(dateTime1)
}