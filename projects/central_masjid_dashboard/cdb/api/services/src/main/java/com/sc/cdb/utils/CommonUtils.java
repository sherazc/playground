package com.sc.cdb.utils;

import java.util.Calendar;

import org.apache.commons.lang3.math.NumberUtils;

public class CommonUtils {
    private CommonUtils() {}

    public static Calendar createCalendar(int year, int month, int date) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DATE, date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }
}
