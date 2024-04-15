package com.sc.cdb.services.dst;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.utils.CdbDateUtils;
import org.springframework.stereotype.Service;

@Service
public class PrayerConfigDstApplierImpl implements PrayerConfigDstApplier {

    private DstCalculator dstCalculator;

    public PrayerConfigDstApplierImpl(
            DstCalculator dstCalculator) {
        this.dstCalculator = dstCalculator;
    }

    @Override
    public void addHoursToDstPeriod(PrayerConfig prayerConfig, int year, int hoursCount) {
        if (!shouldApplyDst(prayerConfig)) {
            return;
        }
        Optional<Date[]> dstPeriodOptional = dstCalculator.dstPeriod(prayerConfig.getDst(), year);

        if (dstPeriodOptional.isEmpty()) {
            return;
        }

        Date beginDst = dstPeriodOptional.get()[0];
        beginDst.setTime(beginDst.getTime() - (1000 * 60 * 60 * 24));

        prayerConfig.getPrayers()
                .forEach(prayer -> addHourToPrayer(dstPeriodOptional.get(), prayer, hoursCount));
    }

    private void addHourToPrayer(Date[] dstPeriod, Prayer prayer, int hoursCount) {
        if (hoursCount == 0) {
            return;
        }

        if (prayer.getDate() != null && dateBetweenPeriod(dstPeriod, prayer.getDate())) {

            prayer.setFajr(addHourToStringDate(prayer.getFajr(), hoursCount));
            prayer.setFajrIqama(addHourToStringDate(prayer.getFajrIqama(), hoursCount));
            prayer.setFajrChange(addHourToStringDate(prayer.getFajrChange(), hoursCount));

            prayer.setDhuhr(addHourToStringDate(prayer.getDhuhr(), hoursCount));
            prayer.setDhuhrIqama(addHourToStringDate(prayer.getDhuhrIqama(), hoursCount));
            prayer.setDhuhrChange(addHourToStringDate(prayer.getDhuhrChange(), hoursCount));

            prayer.setAsr(addHourToStringDate(prayer.getAsr(), hoursCount));
            prayer.setAsrIqama(addHourToStringDate(prayer.getAsrIqama(), hoursCount));
            prayer.setAsrChange(addHourToStringDate(prayer.getAsrChange(), hoursCount));

            prayer.setMaghrib(addHourToStringDate(prayer.getMaghrib(), hoursCount));
            prayer.setMaghribIqama(addHourToStringDate(prayer.getMaghribIqama(), hoursCount));
            prayer.setMaghribChange(addHourToStringDate(prayer.getMaghribChange(), hoursCount));

            prayer.setIsha(addHourToStringDate(prayer.getIsha(), hoursCount));
            prayer.setIshaIqama(addHourToStringDate(prayer.getIshaIqama(), hoursCount));
            prayer.setIshaChange(addHourToStringDate(prayer.getIshaChange(), hoursCount));

            prayer.setSunrise(addHourToStringDate(prayer.getSunrise(), hoursCount));
        }
    }

    private boolean dateBetweenPeriod(Date[] dstPeriod, Date date) {
        if (date == null || dstPeriod == null || dstPeriod.length < 2
                || dstPeriod[0] == null || dstPeriod[1] == null) {
            return false;
        }
        Optional<Calendar> dstBeginOptional = CdbDateUtils.dateToCalendar(dstPeriod[0]);
        Optional<Calendar> dstEndOptional = CdbDateUtils.dateToCalendar(dstPeriod[1]);
        Optional<Calendar> prayerDateOptional = CdbDateUtils.dateToCalendar(date);

        if (dstBeginOptional.isEmpty() && dstEndOptional.isEmpty() && prayerDateOptional.isEmpty()) {
            return false;
        }

        Calendar dstBegin = dstBeginOptional.get();
        Calendar dstEnd = dstEndOptional.get();
        Calendar prayerDate = prayerDateOptional.get();

        prayerDate.set(Calendar.YEAR, dstBegin.get(Calendar.YEAR));
        // TODO: add logic here to include prayerDate == dstBegin
        // to also include dst date as well
        return prayerDate.after(dstBegin) && prayerDate.before(dstEnd);
    }

    private String addHourToStringDate(String time24Hour, int hoursCount) {
        int[] hoursMinutes = CdbDateUtils.hourMinuteStringToInt(time24Hour);
        if (hoursMinutes == null || hoursMinutes.length < 2) {
            return "";
        }

        Calendar calendar = CdbDateUtils.createCalendarFromTime(hoursMinutes[0], hoursMinutes[1]);
        calendar.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY) + hoursCount);
        int[] time24hour = {calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE)};

        return CdbDateUtils.hourMinuteIntToString(time24hour);
    }

    private boolean shouldApplyDst(PrayerConfig prayerConfig) {
        return prayerConfig != null
                && prayerConfig.getDst() != null
                && prayerConfig.getDst().getEnable() != null
                && prayerConfig.getDst().getEnable()
                && prayerConfig.getPrayers() != null
                && !prayerConfig.getPrayers().isEmpty();
    }
}
