package com.sc.cdb.services.common;

public interface CustomConfigurationsService {

    int getIntConfig(String companyId, String configName, int defaultValue);

    String getStringConfig(String companyId, String configName, String defaultValue);
}
