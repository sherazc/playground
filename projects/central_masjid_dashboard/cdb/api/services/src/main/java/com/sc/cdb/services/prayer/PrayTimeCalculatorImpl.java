package com.sc.cdb.services.prayer;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;

import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayTimeCalculatorImpl implements PrayTimeCalculator {
    private static final Logger LOG = LoggerFactory.getLogger(PrayTimeCalculatorImpl.class);
    private static final TimeZone UTC_TIMEZONE = TimeZone.getTimeZone("UTC");

    private static final int SAMPLE_LEAP_YEAR = 2016;

    @Override
    public List<Prayer> generate(PrayerConfig prayerConfig) {
        List<Prayer> prayers = new ArrayList<>(366);
        PrayTime prayTime = new PrayTime();

        prayTime.setTimeFormat(0); // 0 = 24h, 1 = 12h
        prayTime.setCalcMethod(prayerConfig.getCalculationMethod());
        prayTime.setAsrJuristic(prayerConfig.getAsrJuristicMethod());
        // prayTime.setAdjustHighLats(prayers.AngleBased);
        prayTime.tune(prayerConfig.getPrayerOffsetMinutes());

        for (int i = 0; i < 366; i++) {
            prayers.add(generatePrayerDay(prayTime, i, prayerConfig));
        }

        return prayers;
    }

    private Prayer generatePrayerDay(PrayTime prayTime, int yearDateIndex, PrayerConfig prayerConfig) {
        Calendar calendar = createPrayerCalendar(yearDateIndex);

        List<String> prayerTimes = prayTime.getPrayerTimes(
                calendar,
                prayerConfig.getGeoCode().getLatitude(),
                prayerConfig.getGeoCode().getLongitude(),
                prayerConfig.getGeoCode().getTimezone());

        if (prayerTimes == null || prayerTimes.size() < 7) {
            LOG.error("Failed to calculate prayer time for {}", calendar.getTime());
            return null;
        }

        return createPrayer(calendar, prayerTimes);
    }

    private Prayer createPrayer(Calendar calendar, List<String> prayerTimes) {
        Prayer prayer = new Prayer();
        prayer.setDate(calendar.getTime());
        prayer.setFajr(prayerTimes.get(0));
        prayer.setSunrise(prayerTimes.get(1));
        prayer.setDhuhr(prayerTimes.get(2));
        prayer.setAsr(prayerTimes.get(3));
        // Skipping sunset prayer.setSunset(prayerTimes.get(4));
        prayer.setMaghrib(prayerTimes.get(5));
        prayer.setIsha(prayerTimes.get(6));
        return prayer;
    }

    private Calendar createPrayerCalendar(int yearDateIndex) {
        Calendar calendar = Calendar.getInstance(PrayTimeCalculatorImpl.UTC_TIMEZONE);
        calendar.set(PrayTimeCalculatorImpl.SAMPLE_LEAP_YEAR,
                0, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.add(Calendar.DATE, yearDateIndex);
        return calendar;
    }
}
