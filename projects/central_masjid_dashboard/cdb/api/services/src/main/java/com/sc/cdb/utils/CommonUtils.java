package com.sc.cdb.utils;

import java.util.Calendar;
import java.util.Optional;

import com.sc.cdb.services.common.DateTimeCalculator;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

public class CommonUtils {
    private CommonUtils() {}

    public static Calendar createCalendarDate(int year, int month, int date) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DATE, date);
        makeCalendarTimeZero(calendar);
        return calendar;
    }

    public static void makeCalendarTimeZero(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
    }

    public static Calendar createCalendarTime(int hour24OfDay, int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, DateTimeCalculator.DEFAULT_YEAR);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DATE, 1);
        calendar.set(Calendar.HOUR_OF_DAY, hour24OfDay);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }

    public static Optional<Calendar> parseTimeString(String time) {
        if (StringUtils.isBlank(time) || !time.matches(DateTimeCalculator.TIME_24_REGEX)) {
            return Optional.empty();
        }
        String[] hourMinuteParts = time.split(":");
        int hourOfDay = NumberUtils.toInt(hourMinuteParts[0]);
        int minute = NumberUtils.toInt(hourMinuteParts[1]);
        return Optional.of(createCalendarTime(hourOfDay, minute));
    }
}
