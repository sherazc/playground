package com.sc.cdb.services.prayer.calendar;

import java.time.temporal.ChronoField;
import java.util.Calendar;
import java.util.Locale;
import java.util.function.Function;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.HijriMonth;
import com.sc.cdb.data.model.prayer.Prayer;

public class MonthGroupingCollectorFunction implements Function<Prayer, String> {

    private CalenderType calenderType;

    public MonthGroupingCollectorFunction(CalenderType calenderType) {
        this.calenderType = calenderType;
    }

    @Override
    public String apply(Prayer prayer) {
        String monthName;

        if (calenderType == CalenderType.hijri) {
            int monthNumber = prayer.getHijrahDate().get(ChronoField.MONTH_OF_YEAR);
            monthName = HijriMonth.values()[monthNumber - 1].getDisplayName();
        } else {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(prayer.getDate());
            monthName = calendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
        }
        return monthName;
    }
}
