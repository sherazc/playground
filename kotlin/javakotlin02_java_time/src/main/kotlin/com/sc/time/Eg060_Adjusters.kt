package com.sc.time

import java.time.DayOfWeek
import java.time.LocalDate
import java.time.temporal.TemporalAdjusters

fun main() {
    val nextMonday = LocalDate.now().with(TemporalAdjusters.next(DayOfWeek.MONDAY))
    val lastDayOfYear = nextMonday.with(TemporalAdjusters.lastDayOfYear())
    val lastDayOfMonth = lastDayOfYear.with(TemporalAdjusters.lastDayOfMonth())
    println(lastDayOfMonth)
}