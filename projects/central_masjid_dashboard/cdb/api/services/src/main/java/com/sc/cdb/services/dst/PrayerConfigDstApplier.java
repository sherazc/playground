package com.sc.cdb.services.dst;

import com.sc.cdb.data.model.prayer.PrayerConfig;

public interface PrayerConfigDstApplier {
    /**
     * Used to add/remove hours from DST date range
     * e.g.
     * On save if DST is enabled then -1 hour in DST date range
     * On retrieve if DST is enabled then 1 hour in DST date range
     * @param prayerConfig
     * @param year
     * @param hoursCount
     */
    void addHoursToDstPeriod(PrayerConfig prayerConfig, int year, int hoursCount);
}
