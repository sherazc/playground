package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.cc.PrayerConfig;

public interface CentralControlDao {
    boolean isCentralControlExists(String companyId);
    boolean updatePrayerConfig(String companyId, PrayerConfig prayerConfig);
}
