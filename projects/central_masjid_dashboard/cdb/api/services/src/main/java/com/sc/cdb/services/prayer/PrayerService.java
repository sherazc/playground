package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.model.ServiceResponse;


public interface PrayerService {
    boolean isValid(PrayerConfig prayerConfig);
    ServiceResponse<List<Prayer>> createYearPrayerTimes(String companyId, PrayerConfig prayerConfig);
}
