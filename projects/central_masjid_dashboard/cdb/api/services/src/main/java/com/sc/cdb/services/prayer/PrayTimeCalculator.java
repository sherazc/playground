package com.sc.cdb.services.prayer;

import java.util.List;
import java.util.TimeZone;

import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayTimeCalculator {
    List<Prayer> generate(PrayerConfig prayerConfig);
}
