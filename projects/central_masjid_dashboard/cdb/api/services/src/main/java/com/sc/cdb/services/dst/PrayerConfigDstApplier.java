package com.sc.cdb.services.dst;

import com.sc.cdb.data.model.prayer.PrayerConfig;

public interface PrayerConfigDstApplier {
    void addHour(PrayerConfig prayerConfig, int year, int hoursCount);
}
