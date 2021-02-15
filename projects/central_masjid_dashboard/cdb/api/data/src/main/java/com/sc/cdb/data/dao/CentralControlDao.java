package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import org.bson.types.ObjectId;

public interface CentralControlDao extends BaseDao<CentralControl> {
  boolean isCentralControlExists(String companyId);

  List<CentralControlCompany> findByCompanyUrl(String url);

  List<CustomConfiguration> findCustomConfigurationByCompanyIdConfigName(ObjectId companyId, String configName);

  List<CustomConfiguration> findCustomConfigurationByCompanyId(ObjectId companyId);
}
