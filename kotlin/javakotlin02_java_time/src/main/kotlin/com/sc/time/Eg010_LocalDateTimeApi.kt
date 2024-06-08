package com.sc.time

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

fun main() {
    val currentDate = LocalDate.now()
    println("Current date: $currentDate")

    val currentTime = LocalTime.now()
    println("Current time: $currentTime")

    val combinedCurrentDateTime = LocalDateTime.of(currentDate, currentTime);
    println("combinedCurrentDateTime = $combinedCurrentDateTime")

    val currentDateTime = LocalDateTime.now()
    println("Current datetime: $currentDateTime")

    // Month start from Jan
    val endOfJan = LocalDate.of(2024, 1, 31)
    println("End of jan: $endOfJan")


    val endOfJanTime = LocalDateTime.of(2024, 1, 31, 23, 59, 59)
    println("End of jan date time: $endOfJanTime")

}