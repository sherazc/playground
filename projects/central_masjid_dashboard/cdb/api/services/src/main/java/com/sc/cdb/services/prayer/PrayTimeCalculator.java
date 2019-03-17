package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayTimeCalculator {
    List<Prayer> generate(PrayerConfig prayerConfig);
}
