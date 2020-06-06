package com.sc.cdb.services.common;

import java.util.List;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
public class CustomConfigurationsServiceImpl implements CustomConfigurationsService {

    private CentralControlDao centralControlDao;

    public CustomConfigurationsServiceImpl(CentralControlDao centralControlDao) {
        this.centralControlDao = centralControlDao;
    }

    @Override
    public int getIntConfig(String companyId, String configName, int defaultValue) {
        String value = this.getStringConfig(companyId, configName, Integer.toString(defaultValue));
        return (int) NumberUtils.toDouble(value); // NumberUtils.toInt("1.0") return 0
    }

    @Override
    public String getStringConfig(String companyId, String configName, String defaultValue) {
        if (StringUtils.isBlank(companyId) || !ObjectId.isValid(companyId) || StringUtils.isBlank(configName)) {
            return null;
        }
        String result = defaultValue;
        List<CustomConfiguration> customConfigurations = centralControlDao
                .findCustomConfigurationByCompanyIdConfigName(new ObjectId(companyId), configName);

        if (customConfigurations != null && !customConfigurations.isEmpty()) {
            String value = customConfigurations.get(0).getValue();
            if (StringUtils.isNotBlank(value)) {
                result = value;
            }
        }
        return result;
    }

}
