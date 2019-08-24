package com.sc.cdb.services.prayer;

import java.util.Calendar;

import com.sc.cdb.services.common.DateTimeCalculator;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;


public class IqamahCalculatorTest {

    private IqamahCalculator iqamahCalculator;

    @Mock
    private DateTimeCalculator dateTimeCalculator;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        Mockito.when(
                dateTimeCalculator.isValid24Time(Mockito.anyString()))
                .thenReturn(true);

        iqamahCalculator = new IqamahCalculator(dateTimeCalculator);
    }

    @Test
    public void calculate() {


        // Date azanTime = this.createCalendarFromTime(23, 59).getTime();
        String iqamahTime = iqamahCalculator.calculate("06:03", 10, IqamahCalculator.MinutesRound.roundTo15);
        Assert.assertEquals("06:15", iqamahTime);


        System.out.println();
    }

    private Calendar createCalendarFromTime(int hour24, int minute) {
        return this.createCalendar(2016, 0, 1, hour24, minute);
    }

    private Calendar createCalendar(int year, int month, int date, int hour24, int minute) {
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
}