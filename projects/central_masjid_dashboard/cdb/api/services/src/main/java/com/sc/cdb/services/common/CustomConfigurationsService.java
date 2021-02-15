package com.sc.cdb.services.common;

import java.util.List;

import com.sc.cdb.data.model.cc.CustomConfiguration;

public interface CustomConfigurationsService {

    int getIntConfig(String companyId, String configName, int defaultValue);

    String getStringConfig(String companyId, String configName, String defaultValue);

    List<CustomConfiguration> getAllConfig(String companyId);
}
