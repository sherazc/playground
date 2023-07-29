package com.sc.cdb.services.common;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Service;

@Service
public class DateTimeCalculatorImpl implements DateTimeCalculator {

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

    public String intToString(int i) {
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
        return this.createCalendar(DEFAULT_YEAR, 0, 1, hour24, minute);
    }

    public Calendar createCalendar(int year, int month, int date, int hour24, int minute) {
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


    public Optional<Calendar> createCalendar(int year, int month, int date) {
        if (year < 0 || month < 1 || date < 0) {
            return Optional.empty();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DATE, date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return Optional.of(calendar);
    }

    public Optional<Calendar> monthDateStringToCalendar(int year, String monthDateString) {
        if (year < 0 || StringUtils.isBlank(monthDateString) || !monthDateString.matches(MONTH_DATE_REGEX)) {
            return Optional.empty();
        } else {
            String[] monthDateParts = monthDateString.split("/");
            return this.createCalendar(year, NumberUtils.toInt(monthDateParts[0]), NumberUtils.toInt(monthDateParts[1]));
        }
    }

    @Override
    public Optional<Calendar> dateToCalendar(Date date) {
        if(date == null) {
            return Optional.empty();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return Optional.of(calendar);
    }



    public Date dateToCurrentYearData(Date date) {
        Calendar calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        calendar.setTime(date);
        calendar.set(Calendar.YEAR, currentYear);
        return calendar.getTime();
    }


    public int extractDateField(Date date, int calendarField) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(calendarField);
    }

    public Date setDateField(Date date, int calendarField, int value) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendarField, value);
        return calendar.getTime();
    }

    public Date addDateField(Date date, int calendarField, int value) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendarField, value);
        return calendar.getTime();
    }
}
