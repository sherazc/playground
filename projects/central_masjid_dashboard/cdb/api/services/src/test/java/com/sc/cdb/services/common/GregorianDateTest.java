package com.sc.cdb.services.common;

import java.util.Calendar;
import java.util.Date;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.utils.CdbDateUtils;
import org.junit.Assert;
import org.junit.Test;

public class GregorianDateTest {

    @Test
    public void create_from_gregorian() {
        Date date1 = GregorianDate
                .of(CalenderType.gregorian, 2020, 10, 1)
                .create();

        validateDate(date1, 2020, 10, 1);

        Date date2 = GregorianDate
                .of(CalenderType.gregorian, 2020, 1, 1) // 2020/1/1
                .plusYear(1) // 2021/1/1
                .plusYear(-2) // 2019/1/1
                .plusMonth(1) // 2019/2/1
                .plusMonth(-2) // 2018/12/1
                .plusDays(1) // 2018/12/2
                .plusDays(-2) // 2018/11/30
                .create();

        validateDate(date2, 2018, 11, 30);
    }

    @Test
    public void create_from_hijri() {
        Date date1 = GregorianDate
                .of(CalenderType.hijri, 1441, 10, 8)
                .plusHijriAdjustDays(-1)
                .create();

        validateDate(date1, 2020, 5, 30);

        Date date2 = GregorianDate
                .of(CalenderType.hijri, 1441, 10, 8) // 1441/10/8
                .plusYear(1) // 1442/10/8
                .plusYear(-2) // 1440/10/8
                .plusMonth(1) // 1440/11/8
                .plusMonth(-2) // 1440/9/8
                .plusDays(1) // 1440/9/9
                .plusDays(-2) // 1440/9/7
                .plusHijriAdjustDays(1) // 1440/9/8
                .create();

        validateDate(date2, 2019, 5, 13);
    }

    private void validateDate(Date date, int expectedYear, int expectedMonth, int expectedDayOfMonth) {
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(date);
        Assert.assertEquals(expectedYear, calendar.get(Calendar.YEAR));
        Assert.assertEquals(expectedMonth, calendar.get(Calendar.MONTH) + 1);
        Assert.assertEquals(expectedDayOfMonth, calendar.get(Calendar.DAY_OF_MONTH));
        Assert.assertEquals(0, calendar.get(Calendar.HOUR_OF_DAY));
        Assert.assertEquals(0, calendar.get(Calendar.MINUTE));
        Assert.assertEquals(0, calendar.get(Calendar.SECOND));
        Assert.assertEquals(0, calendar.get(Calendar.MILLISECOND));
    }
}