package com.sc.cdb.services.common;

import java.time.LocalDate;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;

import com.sc.cdb.data.model.prayer.CalenderType;

public class GregorianDate {
    private CalenderType calenderType;
    private int year, month, date;
    private int addYear, addMonth, addDays;

    private GregorianDate(CalenderType calenderType, int year, int month, int date) {
        this.calenderType = calenderType;
        this.year = year;
        this.month = month;
        this.date = date;
    }

    public static GregorianDate of(CalenderType calenderType, int year, int month, int date) {
        return new GregorianDate(calenderType, year, month, date);
    }

    public GregorianDate plusYear(int year) {
        this.addYear += year;
        return this;
    }

    public GregorianDate plusMonth(int month) {
        this.addMonth += month;
        return this;
    }

    public GregorianDate plusDays(int days) {
        this.addDays += days;
        return this;
    }

    public Date create() {
        Date result;
        if (this.calenderType == CalenderType.hijri) {
            HijrahDate hijrahDate = HijrahDate.of(this.year, this.month, this.date)
                    .plus(addYear, ChronoUnit.YEARS)
                    .plus(addMonth, ChronoUnit.MONTHS)
                    .plus(addDays, ChronoUnit.DAYS);

            LocalDate localDate = IsoChronology.INSTANCE.date(hijrahDate);

            result = java.sql.Date.valueOf(localDate);
        } else {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, this.year);
            calendar.set(Calendar.MONTH, this.month);
            calendar.set(Calendar.DAY_OF_MONTH, this.date);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            result = calendar.getTime();
        }

        return result;
    }
}
