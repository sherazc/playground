package com.sc.cdb.services.auth;

import java.util.List;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.prayer.PrayerConfig;

public interface CompanyDefaultsCreator {
    List<Object> createAndSaveIfNotExists(String companyId);

    PrayerConfig createEmptyPrayerConfig(String companyId);

    CentralControl createEmptyCentralControl(String companyId);
}
