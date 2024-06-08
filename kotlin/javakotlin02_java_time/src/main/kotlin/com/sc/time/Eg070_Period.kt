package com.sc.time

import java.time.LocalDate
import java.time.Period

fun main() {
    val now = LocalDate.now()
    val nextDate = now.plusMonths(5).plusYears(2).plusDays(40)
    val period: Period = Period.between(now, nextDate)
    println("period: $period")
    println("period days: ${period.days}")
    println("period months: ${period.months}")
    println("period years: ${period.years}")
}