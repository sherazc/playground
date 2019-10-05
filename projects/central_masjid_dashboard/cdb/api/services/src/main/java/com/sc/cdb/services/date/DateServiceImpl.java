package com.sc.cdb.services.date;

import java.util.Calendar;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Service;

@Service
public class DateServiceImpl implements DateService {

    public Optional<Calendar> createCalendar(int year, int month, int date) {
        if (year < 0 || month < 0 || date < 0) {
            return Optional.empty();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DATE, date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return Optional.of(calendar);
    }

    public Optional<Calendar> monthDateStringToCalendar(int year, String monthDateString) {
        if (year < 0 || StringUtils.isBlank(monthDateString) || !monthDateString.matches(DateService.MONTH_DATE_REGEX)) {
            return Optional.empty();
        } else {
            String[] monthDateParts = monthDateString.split("/");
            return this.createCalendar(year, NumberUtils.toInt(monthDateParts[0]), NumberUtils.toInt(monthDateParts[1]));
        }
    }
}
