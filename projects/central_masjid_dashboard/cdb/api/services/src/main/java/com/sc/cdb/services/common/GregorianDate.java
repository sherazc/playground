package com.sc.cdb.services.common;

import java.time.LocalDate;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.utils.CdbDateUtils;

public class GregorianDate {
    private CalenderType calenderType;
    private int year, month, date;
    private int addYear, addMonth, addDays, addHijriAdjustDays;

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

    public GregorianDate plusHijriAdjustDays(int hijriAdjustDays) {
        this.addHijriAdjustDays += hijriAdjustDays;
        return this;
    }

    public Date create() {
        Date result;
        if (this.calenderType == CalenderType.hijri) {
            HijrahDate hijrahDate = HijrahDate.of(this.year, this.month, this.date)
                    .plus(this.addYear, ChronoUnit.YEARS)
                    .plus(this.addMonth, ChronoUnit.MONTHS)
                    .plus(this.addDays, ChronoUnit.DAYS)
                    .plus(this.addHijriAdjustDays, ChronoUnit.DAYS);

            LocalDate localDate = IsoChronology.INSTANCE.date(hijrahDate);

            result = java.sql.Date.valueOf(localDate);
        } else {
            Calendar calendar = CdbDateUtils.todayUtc();
            calendar.set(Calendar.YEAR, this.year);
            calendar.set(Calendar.MONTH, this.month - 1);
            calendar.set(Calendar.DAY_OF_MONTH, this.date);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);

            calendar.add(Calendar.YEAR, this.addYear);
            calendar.add(Calendar.MONTH, this.addMonth);
            calendar.add(Calendar.DAY_OF_MONTH, this.addDays);
            result = calendar.getTime();
        }

        return result;
    }
}
