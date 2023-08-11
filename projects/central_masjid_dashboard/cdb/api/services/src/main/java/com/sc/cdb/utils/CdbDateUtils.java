package com.sc.cdb.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.TimeZone;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

public class CdbDateUtils {

    public static final TimeZone TIMEZONE_UTC = TimeZone.getTimeZone("UTC");
    public static final TimeZone TIMEZONE_DEFAULT = TIMEZONE_UTC;

    public static final String MONTH_DATE_REGEX = "^(0[1-9]|1[0-2]|0?[1-9])\\/(0[1-9]|[12]\\d|3[01]|0?[1-9])$";

    public static final String TIME_24_REGEX = "^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$";

    public static final Pattern TIME_24_REGEX_PATTERN = Pattern.compile(TIME_24_REGEX);

    public static final int DEFAULT_YEAR = 2016;

    public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("MM/dd");
    public static final SimpleDateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm");

    private CdbDateUtils() {}

    public static Calendar todayUtc() {
        return Calendar.getInstance(TIMEZONE_UTC);
    }
    public static Calendar today() {
        return Calendar.getInstance(TIMEZONE_DEFAULT);
    }

    public static Calendar createCalendarDate(int year, int month, int date) {
        Calendar calendar = CdbDateUtils.todayUtc();
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
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.set(Calendar.YEAR, CdbDateUtils.DEFAULT_YEAR);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DATE, 1);
        calendar.set(Calendar.HOUR_OF_DAY, hour24OfDay);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }

    public static Optional<Calendar> parseTimeString(String time) {
        if (StringUtils.isBlank(time) || !time.matches(CdbDateUtils.TIME_24_REGEX)) {
            return Optional.empty();
        }
        String[] hourMinuteParts = time.split(":");
        int hourOfDay = NumberUtils.toInt(hourMinuteParts[0]);
        int minute = NumberUtils.toInt(hourMinuteParts[1]);
        return Optional.of(createCalendarTime(hourOfDay, minute));
    }


    public static Calendar makeTimeCalendar(int hour, int minute) {
        Calendar calendar = CdbDateUtils.todayUtc();
        //calendar.setTimeInMillis(0);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        CdbDateUtils.removeSecondsFromCalendar(calendar);
        //calendar.set(Calendar.YEAR, STARTING_YEAR);
        return calendar;
    }

    public static void removeSecondsFromCalendar(Calendar calendar) {
        if (calendar == null) {
            return;
        }
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
    }

    public static Calendar createPrayerCalendar(int yearDateIndex) {
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.set(CdbDateUtils.DEFAULT_YEAR,
                0, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.add(Calendar.DATE, yearDateIndex);
        return calendar;
    }


    public static boolean isValid24Time(String timeInString) {
        int length = StringUtils.length(timeInString);
        if (length > 5 || length < 3) {
            return false;
        }
        return TIME_24_REGEX_PATTERN.matcher(timeInString).matches();
    }

    public static int[] hourMinuteStringToInt(String time24hour) {
        if (!isValid24Time(time24hour)) {
            return null;
        }

        String[] hourMinuteStrings = time24hour.split(":");

        return new int[]{
                Integer.parseInt(hourMinuteStrings[0]),
                Integer.parseInt(hourMinuteStrings[1])};
    }

    public static String hourMinuteIntToString(int[] time24hour) {
        if (time24hour == null || time24hour.length != 2) {
            return null;
        }

        String hourMinute = new StringBuilder(intToString(time24hour[0]))
                .append(':')
                .append(intToString(time24hour[1])).toString();

        if (isValid24Time(hourMinute)) {
            return hourMinute;
        } else {
            return null;
        }
    }

    public static String intToString(int i) {
        StringBuilder stringBuilder = new StringBuilder();
        if (i < 0 || i > 59) {
            return null;
        } else if (i < 10) {
            return stringBuilder.append(0).append(i).toString();
        } else {
            return stringBuilder.append(i).toString();
        }
    }

    public static Calendar createCalendarFromTime(int hour24, int minute) {
        return createCalendar(DEFAULT_YEAR, 0, 1, hour24, minute);
    }

    public static Calendar createCalendar(int year, int month, int date, int hour24, int minute) {
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DATE, date);
        calendar.set(Calendar.HOUR_OF_DAY, hour24);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }


    public static Optional<Calendar> createCalendar(int year, int month, int date) {
        if (year < 0 || month < 1 || date < 0) {
            return Optional.empty();
        }
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DATE, date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return Optional.of(calendar);
    }

    public static Optional<Calendar> monthDateStringToCalendar(int year, String monthDateString) {
        if (year < 0 || StringUtils.isBlank(monthDateString) || !monthDateString.matches(MONTH_DATE_REGEX)) {
            return Optional.empty();
        } else {
            String[] monthDateParts = monthDateString.split("/");
            return createCalendar(year, NumberUtils.toInt(monthDateParts[0]), NumberUtils.toInt(monthDateParts[1]));
        }
    }


    public static Optional<Calendar> dateToCalendar(Date date) {
        if(date == null) {
            return Optional.empty();
        }
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(date);
        return Optional.of(calendar);
    }



    public static Date dateToCurrentYearData(Date date) {
        Calendar calendar = CdbDateUtils.todayUtc();
        int currentYear = calendar.get(Calendar.YEAR);
        calendar.setTime(date);
        calendar.set(Calendar.YEAR, currentYear);
        return calendar.getTime();
    }


    public static int extractDateField(Date date, int calendarField) {
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(date);
        return calendar.get(calendarField);
    }

    public static Date setDateField(Date date, int calendarField, int value) {
        if (date == null) {
            return null;
        }
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(date);
        calendar.set(calendarField, value);
        return calendar.getTime();
    }

    public static Date addDateField(Date date, int calendarField, int value) {
        if (date == null) {
            return null;
        }
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(date);
        calendar.add(calendarField, value);
        return calendar.getTime();
    }

    public static int mergeNumbers(int num1, int num2) {
        String num1String = CdbStringUtils.leftPadNum(num1, 2);
        String num2String = CdbStringUtils.leftPadNum(num2, 2);
        return Integer.parseInt(num1String + num2String);
    }

    public static int mergeNumbersDate(Date date) {
        if (date == null) {
            return 0;
        }
        int num1 = extractDateField(date, Calendar.MONTH) + 1;
        int num2 = extractDateField(date, Calendar.DATE);
        return mergeNumbers(num1, num2);
    }

    public static int mergeNumbersCalendar(Calendar calendar) {
        if (calendar == null) {
            return 0;
        }
        int num1 = calendar.get(Calendar.MONTH) + 1;
        int num2 = calendar.get(Calendar.DATE);
        return mergeNumbers(num1, num2);
    }
}
