package com.sc.cdb.services.common;

import java.util.Calendar;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class DateTimeCalculator {

    private static final Pattern TIME_24_REGEX_PATTERN =
            Pattern.compile("^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");


    public boolean isValid24Time(String timeInString) {
        int length = StringUtils.length(timeInString);
        if (length > 5 || length < 3) {
            return false;
        }
        return TIME_24_REGEX_PATTERN.matcher(timeInString).matches();
    }

    public int[] hourMinuteStringToInt(String time24hour) {
        if (!isValid24Time(time24hour)) {
            return null;
        }

        String[] hourMinuteStrings = time24hour.split(":");

        return new int[]{
                Integer.parseInt(hourMinuteStrings[0]),
                Integer.parseInt(hourMinuteStrings[1])};
    }

    public String hourMinuteIntToString(int[] time24hour) {
        if (time24hour == null || time24hour.length != 2) {
            return null;
        }

        String hourMinute = new StringBuilder(intToString(time24hour[0]))
                .append(':')
                .append(intToString(time24hour[1])).toString();

        if (this.isValid24Time(hourMinute)) {
            return hourMinute;
        } else {
            return null;
        }
    }

    private String intToString(int i) {
        StringBuilder stringBuilder = new StringBuilder();
        if (i < 0 || i > 59) {
            return null;
        } else if (i < 10) {
            return stringBuilder.append(0).append(i).toString();
        } else {
            return stringBuilder.append(i).toString();
        }
    }

    public Calendar createCalendarFromTime(int hour24, int minute) {
        return this.createCalendar(2016, 0, 1, hour24, minute);
    }

    private Calendar createCalendar(int year, int month, int date, int hour24, int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DATE, date);
        calendar.set(Calendar.HOUR_OF_DAY, hour24);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }
}