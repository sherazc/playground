package com.sc.cdb.services.prayer;

import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.services.model.ServiceResponse;


public interface PrayerService {
    ServiceResponse<GeoCode> geoCode(String location);

    ServiceResponse<String> updatePrayerConfig(String companyId, PrayerConfig prayerConfig);
}
