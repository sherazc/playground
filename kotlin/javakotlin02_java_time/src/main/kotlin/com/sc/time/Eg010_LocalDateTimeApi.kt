package com.sc.time

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

fun main() {
    val currentDate = LocalDate.now()
    println("Current date: $currentDate")

    val currentTime = LocalTime.now()
    println("Current time: $currentTime")

    val currentDateTime = LocalDateTime.now()
    println("Current datetime: $currentDateTime")
}