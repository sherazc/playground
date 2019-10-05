package com.sc.cdb.services.date;

import java.util.Calendar;
import java.util.Optional;

public interface DateService {
    String MONTH_DATE_REGEX = "^(0[1-9]|1[0-2]|0?[1-9])\\/(0[1-9]|[12]\\d|3[01]|0?[1-9])$";

    Optional<Calendar> createCalendar(int year, int month, int date);

    Optional<Calendar> monthDateStringToCalendar(int year, String monthDateString);
}
