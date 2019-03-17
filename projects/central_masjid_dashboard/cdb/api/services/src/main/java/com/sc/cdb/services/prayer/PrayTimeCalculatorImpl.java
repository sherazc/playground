package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.stereotype.Service;

@Service
public class PrayTimeCalculatorImpl implements PrayTimeCalculator {

    private PrayTime prayTime;


    @Override
    public List<Prayer> generate(PrayerConfig prayerConfig) {
        return null;
    }
}
