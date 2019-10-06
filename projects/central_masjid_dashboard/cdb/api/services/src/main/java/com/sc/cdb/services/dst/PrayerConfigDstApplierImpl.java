package com.sc.cdb.services.dst;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.common.DateTimeCalculator;
import org.springframework.stereotype.Service;

@Service
public class PrayerConfigDstApplierImpl implements PrayerConfigDstApplier {

    private DstCalculator dstCalculator;
    private DateTimeCalculator dateTimeCalculator;

    public PrayerConfigDstApplierImpl(
            DstCalculator dstCalculator,
            DateTimeCalculator dateTimeCalculator) {
        this.dstCalculator = dstCalculator;
        this.dateTimeCalculator = dateTimeCalculator;
    }

    @Override
    public void addHour(PrayerConfig prayerConfig, int year, int hoursCount) {
        if (!shouldApplyDst(prayerConfig)) {
            return;
        }
        Optional<Date[]> dstPeriodOptional = dstCalculator.dstPeriod(prayerConfig.getDst(), year);

        if (dstPeriodOptional.isEmpty()) {
            return;
        }

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
        return date.after(dstPeriod[0]) && date.before(dstPeriod[1]);
    }

    private String addHourToStringDate(String time24Hour, int hoursCount) {
        int[] hoursMinutes = dateTimeCalculator.hourMinuteStringToInt(time24Hour);
        if (hoursMinutes == null || hoursMinutes.length < 2) {
            return "";
        }

        Calendar calendar = dateTimeCalculator.createCalendarFromTime(hoursMinutes[0], hoursMinutes[1]);
        calendar.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY) + hoursCount);
        int[] time24hour = {calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE)};

        return dateTimeCalculator.hourMinuteIntToString(time24hour);
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
