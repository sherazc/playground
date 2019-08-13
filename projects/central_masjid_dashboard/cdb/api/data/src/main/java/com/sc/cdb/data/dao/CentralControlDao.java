package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.data.model.prayer.PrayerConfig;

public interface CentralControlDao extends BaseDao<CentralControl> {
  boolean isCentralControlExists(String companyId);

  // Do it PrayerDao
  @Deprecated
  boolean updatePrayerConfig(String companyId, PrayerConfig prayerConfig);

  List<CentralControlCompany> findByCompanyUrl(String url);
}
