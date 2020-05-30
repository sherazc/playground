package com.sc.cdb.services.prayer.calendar;

import java.util.List;
import java.util.Map;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.Month;
import com.sc.cdb.data.model.prayer.MonthPrayers;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerCalendarService {
    ServiceResponse<List<MonthPrayers>> calendar(String companyId, CalenderType type, int year, int month);
}
