package com.sc.time

import java.time.LocalDate
import java.time.temporal.ChronoUnit

fun main() {
    val date1 = LocalDate.now()
        .plusDays(20)
        .plusWeeks(5)
        .minusYears(5)
        .minusMonths(4)

    val date2 = date1
        .plus(3, ChronoUnit.YEARS)
        .plus(40, ChronoUnit.DAYS)
        .plus(40, ChronoUnit.WEEKS)
        .minus(6, ChronoUnit.MONTHS)
        .minus(1, ChronoUnit.YEARS)

    println(date2)

    /*
    NOTE: Because of immutability, all above lines are creating new Object
     */
}
