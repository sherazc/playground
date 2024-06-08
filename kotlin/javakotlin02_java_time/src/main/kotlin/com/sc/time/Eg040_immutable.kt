package com.sc.time

import java.time.LocalDate

fun main() {
    /*
    Java time API is immutable.
    E.g., Changing year or month create a new LocalDate object
     */
    val currentDate = LocalDate.now()
    val currentDateYearChange = currentDate.withYear(2022)
    val currentDateMonthChange = currentDateYearChange.withMonth(12)

    println(currentDate)
    println(currentDate.hashCode())
    println(currentDateYearChange)
    println(currentDateYearChange.hashCode())
    println(currentDateMonthChange)
    println(currentDateMonthChange.hashCode())
}