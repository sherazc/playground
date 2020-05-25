package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerCalendarService {
    ServiceResponse<List<Prayer>> calendar(String companyId, CalenderType type, int year, int month);
}
