package com.sc.cdb.services.prayer.calendar;

import java.util.List;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.CompanyMonthPrayers;
import com.sc.cdb.data.model.prayer.MonthPrayers;
import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerCalendarService {
    ServiceResponse<List<MonthPrayers>> calendar(String companyId, CalenderType type, int year, int month);

    ServiceResponse<CompanyMonthPrayers> calendarByCompanyUrl(String companyUrl, CalenderType type, int year, int month);
}
