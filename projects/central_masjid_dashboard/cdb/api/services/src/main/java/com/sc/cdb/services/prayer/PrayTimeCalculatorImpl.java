package com.sc.cdb.services.prayer;

import java.util.ArrayList;
import java.util.List;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.stereotype.Service;

@Service
public class PrayTimeCalculatorImpl implements PrayTimeCalculator {

    private static final int SAMPLE_LEAP_YEAR = 2016;
    private PrayTime prayTime;

    public PrayTimeCalculatorImpl() {
        prayTime = new PrayTime();
    }

    @Override
    public List<Prayer> generate(PrayerConfig prayerConfig) {
        List<Prayer> prayers = new ArrayList<>(366);
        for (int i = 0; i < 366; i++) {
            prayers.add(generatePrayerDay(i, prayerConfig));
        }

        return prayers;
    }

    private Prayer generatePrayerDay(int yearDateIndex, PrayerConfig prayerConfig) {
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
}
