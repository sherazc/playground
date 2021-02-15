package com.sc.cdb.services.common;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.services.picklist.PicklistService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomConfigurationsServiceImpl implements CustomConfigurationsService {

    private final CentralControlDao centralControlDao;
    private final PicklistService picklistService;

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

    @Override
    public List<CustomConfiguration> getAllConfig(String companyId) {
        if (StringUtils.isBlank(companyId) || !ObjectId.isValid(companyId)) {
            return new ArrayList<>();
        }

        List<CustomConfiguration> companyConfigs = centralControlDao
                .findCustomConfigurationByCompanyId(new ObjectId(companyId));

        return picklistService.getAllConfiguration().stream()
                .map(p -> new CustomConfiguration(p.getName(), p.getDefaultValue()))
                .map(c -> overrideCompanyConfig(c, companyConfigs))
                .collect(Collectors.toList());
    }

    private CustomConfiguration overrideCompanyConfig(CustomConfiguration picklistConfig, List<CustomConfiguration> companyConfigs) {
        if (companyConfigs == null || companyConfigs.isEmpty() || picklistConfig == null) {
            return picklistConfig;
        }

        companyConfigs.stream()
                .filter(c -> StringUtils.equals(c.getName(), picklistConfig.getName()))
                .filter(c -> StringUtils.isNotBlank(c.getValue()))
                .findFirst()
                .ifPresent(c -> picklistConfig.setValue(c.getValue()));

        return picklistConfig;
    }
}
