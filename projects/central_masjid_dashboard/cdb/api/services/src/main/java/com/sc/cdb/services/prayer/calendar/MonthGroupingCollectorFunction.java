package com.sc.cdb.services.prayer.calendar;

import java.time.temporal.ChronoField;
import java.util.Calendar;
import java.util.Locale;
import java.util.function.Function;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.HijriMonth;
import com.sc.cdb.data.model.prayer.Month;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.utils.CdbDateUtils;

public class MonthGroupingCollectorFunction implements Function<Prayer, Month> {

    private CalenderType calenderType;

    public MonthGroupingCollectorFunction(CalenderType calenderType) {
        this.calenderType = calenderType;
    }

    @Override
    public Month apply(Prayer prayer) {
        Month month;

        if (calenderType == CalenderType.hijri) {
            int monthNumber = prayer.getHijrahDate().get(ChronoField.MONTH_OF_YEAR);
            String monthName = HijriMonth.values()[monthNumber - 1].getDisplayName();
            month = new Month(monthNumber, monthName);
        } else {
            Calendar calendar = CdbDateUtils.todayUtc();
            calendar.setTime(prayer.getDate());
            int monthNumber = calendar.get(Calendar.MONTH) + 1;
            String monthName = calendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
            month = new Month(monthNumber, monthName);
        }
        return month;
    }
}
