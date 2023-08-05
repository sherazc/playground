package com.sc.cdb.services.dst;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.utils.CdbDateUtils;
import org.springframework.stereotype.Service;


/*
DST Rules
begins at 2:00 a.m. on the second Sunday of March and
ends at 2:00 a.m. on the first Sunday of November
https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst
*/

@Service
public class DstCalculatorImpl implements DstCalculator {

    @Override
    public Optional<Date[]> dstPeriod(int year) {
        Optional<Calendar> beginOptional = CdbDateUtils.createCalendar(year, 3, 1);
        Optional<Calendar> endOptional = CdbDateUtils.createCalendar(year, 11, 1);

        if (beginOptional.isEmpty() || endOptional.isEmpty()) {
            return Optional.empty();
        } else {
            Calendar begin = beginOptional.get();
            Calendar end = endOptional.get();

            // These calculation only applies after year 2007
            addSundays(begin, 2);
            addSundays(end, 1);

            return Optional.of(new Date[]{begin.getTime(), end.getTime()});
        }
    }

    public Optional<Date[]> dstPeriod(Dst dst, int year) {
        if (dst == null || dst.getEnable() == null || !dst.getEnable()) {
            return Optional.empty();
        }

        Optional<Date[]> dstRange;

        if (dst.getAutomaticCalculate() != null && !dst.getAutomaticCalculate()) {
            Optional<Calendar> beginOptional = CdbDateUtils.monthDateStringToCalendar(year, dst.getBeginMonthDate());
            Optional<Calendar> endOptional = CdbDateUtils.monthDateStringToCalendar(year, dst.getEndMonthDate());
            if (beginOptional.isEmpty() || endOptional.isEmpty() || beginOptional.get().after(endOptional.get())) {
                dstRange = dstPeriod(year);
            } else {
                dstRange = Optional.of(new Date[]{beginOptional.get().getTime(), endOptional.get().getTime()});
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
        while (count != 0) {
            calendar.add(Calendar.DATE, 1);
            dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
            if (dayOfWeek == Calendar.SUNDAY) {
                count--;
            }
        }

    }
}
