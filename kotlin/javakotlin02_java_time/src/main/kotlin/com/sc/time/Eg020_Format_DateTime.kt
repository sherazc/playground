package com.sc.time

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun main() {
    val dateTimeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    val formatedDateTime: String = LocalDateTime.now().format(dateTimeFormatter)
    println("Current formated date time: $formatedDateTime")

    val parsedLocalDateTime: LocalDateTime = LocalDateTime.parse("2024-06-06T22:00:48.120Z", dateTimeFormatter)
    println("Parsed LocalDateTime: $parsedLocalDateTime")
}