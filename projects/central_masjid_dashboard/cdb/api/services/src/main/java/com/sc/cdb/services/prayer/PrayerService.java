package com.sc.cdb.services.prayer;

import java.util.Optional;

import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.model.ServiceResponse;


public interface PrayerService {

    boolean isValid(PrayerConfig prayerConfig);

    ServiceResponse<PrayerConfig> createYearPrayerTimes(PrayerConfig prayerConfig, Boolean generateIqamah);

    Optional<PrayerConfig> getPrayerConfig(String companyId);

    ServiceResponse<String> savePrayerConfig(PrayerConfig prayerConfig);
}
