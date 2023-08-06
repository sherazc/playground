package com.sc.cdb.services.common;

import java.time.LocalDate;
import java.time.chrono.HijrahChronology;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.util.Calendar;
import java.util.Date;

import com.sc.cdb.utils.CdbDateUtils;
import org.springframework.stereotype.Component;

@Component
public class GregorianHijriConverterImpl implements GregorianHijriConverter {

    @Override
    public HijrahDate fromGregorian(Date date) {
        if (date == null) {
            return null;
        }
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(date);
        LocalDate gregorianDate = LocalDate.of(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, calendar.get(Calendar.DAY_OF_MONTH));

        return HijrahChronology.INSTANCE.date(gregorianDate);
    }

    @Override
    public Date fromHijri(HijrahDate hijrahDate) {
        if (hijrahDate == null) {
            return null;
        }
        LocalDate localDate = IsoChronology.INSTANCE.date(hijrahDate);
        return java.sql.Date.valueOf(localDate);
    }
}
