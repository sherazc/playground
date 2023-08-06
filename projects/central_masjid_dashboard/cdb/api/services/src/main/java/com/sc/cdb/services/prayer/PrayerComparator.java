package com.sc.cdb.services.prayer;

import java.util.Calendar;
import java.util.Comparator;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.utils.CdbDateUtils;
import org.springframework.stereotype.Component;

@Component
public class PrayerComparator implements Comparator<Prayer> {

    @Override
    public int compare(Prayer prayer1, Prayer prayer2) {
        if (prayer1.getDate() == null && prayer2.getDate() == null) {
            return 0;
        } else if (prayer1.getDate() == null) {
            return 1;
        } else if (prayer2.getDate() == null) {
            return -1;
        }

        Calendar prayerCalendar2 = CdbDateUtils.todayUtc();
        prayerCalendar2.setTime(prayer2.getDate());

        int prayerDate = prayerCalendar2.get(Calendar.DATE);
        int prayerMonth = prayerCalendar2.get(Calendar.MONTH) + 1;

        return this.comparePrayerMonthDate(prayer1, prayerMonth, prayerDate);
    }

    public int comparePrayerMonthDate(Prayer prayer, int month, int date) {
        if (prayer.getDate() == null) {
            return -1;
        }
        Calendar prayerCalendar = CdbDateUtils.todayUtc();
        prayerCalendar.setTime(prayer.getDate());

        int prayerMonth = prayerCalendar.get(Calendar.MONTH) + 1;
        int prayerDate = prayerCalendar.get(Calendar.DATE);

        int result;
        if (prayerMonth > month) {
            result = 1;
        } else if (prayerMonth < month) {
            result = -1;
        } else {
            result = Integer.compare(prayerDate, date);
        }

        return result;
    }
}
