package com.sc.cdb.services.prayer;

import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerConfigService {
    Optional<PrayerConfig> getPrayerConfig(String companyId);

    ServiceResponse<String> savePrayerConfig(PrayerConfig prayerConfig);

    ServiceResponse<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day);
}