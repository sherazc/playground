package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerConfigDao {
    List<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day);
}
