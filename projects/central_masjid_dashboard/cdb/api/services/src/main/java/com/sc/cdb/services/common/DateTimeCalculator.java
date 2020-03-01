package com.sc.cdb.services.common;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.regex.Pattern;

public interface DateTimeCalculator {

    String MONTH_DATE_REGEX = "^(0[1-9]|1[0-2]|0?[1-9])\\/(0[1-9]|[12]\\d|3[01]|0?[1-9])$";

    String TIME_24_REGEX = "^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$";

    Pattern TIME_24_REGEX_PATTERN = Pattern.compile(TIME_24_REGEX);

    int DEFAULT_YEAR = 2016;

    SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("MM/dd");
    SimpleDateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm");

    boolean isValid24Time(String timeInString);

    int[] hourMinuteStringToInt(String time24hour);

    String hourMinuteIntToString(int[] time24hour);

    Calendar createCalendarFromTime(int hour24, int minute);

    Calendar createCalendar(int year, int month, int date, int hour24, int minute);

    Optional<Calendar> createCalendar(int year, int month, int date);

    Optional<Calendar> monthDateStringToCalendar(int year, String monthDateString);

    Optional<Calendar> dateToCalendar(Date date);
}
