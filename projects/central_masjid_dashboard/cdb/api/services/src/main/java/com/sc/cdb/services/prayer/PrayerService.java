package com.sc.cdb.services.prayer;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.services.model.ServiceResponse;


public interface PrayerService {
    boolean isValid(PrayerConfig prayerConfig);
    ServiceResponse<String> createYearPrayerTimes(String companyId, PrayerConfig prayerConfig);
}
