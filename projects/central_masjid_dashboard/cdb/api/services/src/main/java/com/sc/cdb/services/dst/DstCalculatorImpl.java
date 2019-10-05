package com.sc.cdb.services.dst;

import java.util.Calendar;
import java.util.Date;

import com.sc.cdb.services.date.DateService;
import org.springframework.stereotype.Service;


/*
DST Rules
begins at 2:00 a.m. on the second Sunday of March and
ends at 2:00 a.m. on the first Sunday of November
https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst
*/

@Service
public class DstCalculatorImpl implements DstCalculator {

    private DateService dateService;

    public DstCalculatorImpl(DateService dateService) {
        this.dateService = dateService;
    }

    @Override
    public Date[] calculate(int year) {
        Calendar begin = dateService.createCalendar(year, 2, 1);
        Calendar end = dateService.createCalendar(year, 10, 1);

        addSundays(begin, 2);
        addSundays(end, 1);

        return new Date[]{begin.getTime(), end.getTime()};
    }

    private void addSundays(Calendar calendar, int count) {
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if (dayOfWeek == Calendar.SUNDAY) {
            count--;
        }
        while(count != 0) {
            calendar.add(Calendar.DATE, 1);
            dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
            if (dayOfWeek == Calendar.SUNDAY) {
                count--;
            }
        }

    }
}
