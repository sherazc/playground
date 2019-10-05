package com.sc.cdb.services.dst;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Dst;
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
    public Optional<Date[]> dstPeriod(int year) {
        Optional<Calendar> beginOptional = dateService.createCalendar(year, 2, 1);
        Optional<Calendar> endOptional = dateService.createCalendar(year, 10, 1);

        if (beginOptional.isEmpty() || endOptional.isEmpty()) {
            return Optional.empty();
        } else {
            Calendar begin = beginOptional.get();
            Calendar end = endOptional.get();

            addSundays(begin, 2);
            addSundays(end, 1);
            return Optional.of(new Date[]{begin.getTime(), end.getTime()});
        }
    }

    public Optional<Date[]> dstPeriod(Dst dst, int year) {
        Optional<Date[]> dstRange;

        if (dst != null && !dst.getAutomaticCalculate()) {
            Optional<Calendar> startOptional = dateService.monthDateStringToCalendar(year, dst.getStartMonthDate());
            Optional<Calendar> endOptional = dateService.monthDateStringToCalendar(year, dst.getEndMonthDate());
            if (startOptional.isEmpty() || endOptional.isEmpty() || startOptional.get().after(endOptional.get())) {
                dstRange = dstPeriod(year);
            } else {
                dstRange = Optional.of(new Date[] {startOptional.get().getTime(), endOptional.get().getTime()});
            }
        } else {
            dstRange = dstPeriod(year);
        }
        return dstRange;
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
