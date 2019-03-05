package com.sc.cdb.services.prayer;

import com.sc.cdb.data.model.prayer.GeoCode;
import com.sc.cdb.services.model.ServiceResponse;


public interface PrayerService {
    ServiceResponse<GeoCode> geoCode(String location);
}
