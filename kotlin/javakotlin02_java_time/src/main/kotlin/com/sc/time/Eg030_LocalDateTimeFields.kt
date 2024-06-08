package com.sc.time

import java.time.DayOfWeek
import java.time.LocalDateTime
import java.time.Month
import java.time.ZoneOffset

fun main() {
    val currentTime = LocalDateTime.now()

    // In java, all of these are getter methods.
    val currentYear:Int = currentTime.year
    val currentMonthValue:Int = currentTime.monthValue
    val currentMonth:Month = currentTime.month
    val currentDayOfMonth:Int = currentTime.dayOfMonth
    val currentDayOfWeek: DayOfWeek = currentTime.dayOfWeek
    val currentDayOfWeekValue: String = currentTime.dayOfWeek.name
    val currentDayOfYear:Int = currentTime.dayOfYear
    val currentHour:Int = currentTime.hour
    val currentMinute:Int = currentTime.minute
    val currentSec:Int = currentTime.second
    val currentNano:Int = currentTime.nano
    val currentEpochSecond:Long = currentTime.toEpochSecond(ZoneOffset.UTC)

    println("""
        currentYear=$currentYear
        currentMonth=$currentMonth
        currentMonthValue=$currentMonthValue
        currentDayOfMonth=$currentDayOfMonth
        currentDayOfYear=$currentDayOfYear
        currentDayOfWeek=$currentDayOfWeek
        currentDayOfWeekValue=$currentDayOfWeekValue
        currentHour=$currentHour
        currentMinute=$currentMinute
        currentSec=$currentSec
        currentNano=$currentNano
        currentEpochSecond=$currentEpochSecond
    """.trimIndent())
}