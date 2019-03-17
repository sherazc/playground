package com.sc.cdb.services.prayer;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayTimeCalculatorImpl implements PrayTimeCalculator {
    private static final Logger LOG = LoggerFactory.getLogger(PrayTimeCalculatorImpl.class);

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


    /*
    Fajr - 10:07
Sunrise - 11:25
Dhuhr - 17:28
Asr - 22:17
Sunset - 23:32
Maghrib - 23:33
Isha - 00:57
     */
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
        Prayer prayer = new Prayer();
        prayer.setDate(calendar.getTime());
        prayer.setFajrAzan(new PrayerDate(prayerTimes.get(0)));








        return null;
    }

    /*
    double latitude = 34.125401;
    double longitude = -84.277672;
    double timezone = -5;
    // Test Prayer times here
    PrayTime prayers = new PrayTime();

    prayers.setTimeFormat(prayers.Time12);
    prayers.setCalcMethod(prayers.ISNA);
    prayers.setAsrJuristic(prayers.Shafii);
    prayers.setAdjustHighLats(prayers.AngleBased);
    int[] offsets = {0, 0, 0, 0, 0, 0, 0}; // {Fajr,Sunrise,Dhuhr,Asr,Sunset,Maghrib,Isha}
    prayers.tune(offsets);

    Date now = new Date();
    Calendar cal = Calendar.getInstance();
    cal.setTime(now);

    ArrayList<String> prayerTimes = prayers.getPrayerTimes(cal,
        latitude, longitude, timezone);
    ArrayList<String> prayerNames = prayers.getTimeNames();

    for (int i = 0; i < prayerTimes.size(); i++) {
      System.out.println(prayerNames.get(i) + " - " + prayerTimes.get(i));
    }

     */

    private Calendar createPrayerCalendar(int yearDateIndex) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(PrayTimeCalculatorImpl.SAMPLE_LEAP_YEAR,
                0, 1, 0, 0, 0);
        calendar.add(Calendar.DATE, yearDateIndex);
        return calendar;
    }
}
