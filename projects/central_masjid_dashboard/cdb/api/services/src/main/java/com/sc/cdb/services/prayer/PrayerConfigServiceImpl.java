package com.sc.cdb.services.prayer;

import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.dao.PrayerConfigDao;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayerConfigServiceImpl implements PrayerConfigService {
    private static final Logger LOG = LoggerFactory.getLogger(PrayerConfigServiceImpl.class);

    private PrayerConfigRepository prayerConfigRepository;
    private PrayerConfigDao prayerConfigDao;

    public PrayerConfigServiceImpl(PrayerConfigRepository prayerConfigRepository, PrayerConfigDao prayerConfigDao) {
        this.prayerConfigRepository = prayerConfigRepository;
        this.prayerConfigDao = prayerConfigDao;
    }

    @Override
    public ServiceResponse<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day) {
        ServiceResponse.ServiceResponseBuilder<Prayer> serviceResponseBuilder = ServiceResponse.builder();
        if (month > 12 || month < 1) {
            serviceResponseBuilder.successful(false).message("Invalid Month");
        } else if (day > 31 || day < 1) {
            serviceResponseBuilder.successful(false).message("Invalid Day");
        } else if (StringUtils.isBlank(companyId)) {
            serviceResponseBuilder.successful(false).message("Invalid CompanyId");
        } else {
            List<Prayer> prayers = prayerConfigDao.getPrayerByCompanyId(companyId);
            if (prayers == null || prayers.isEmpty()) {
                serviceResponseBuilder.successful(false).message("Prayer not found.");
            } else {
                serviceResponseBuilder
                        .target(prayers.get(0))
                        .successful(true)
                        .message("Prayer found.");
            }
        }

        return serviceResponseBuilder.build();
    }



    @Override
    public ServiceResponse<String> savePrayerConfig(PrayerConfig prayerConfig) {
        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();
        PrayerConfig save = prayerConfigRepository.save(prayerConfig);
        if (save == null || StringUtils.isBlank(save.getId())) {
            serviceResponseBuilder.successful(false).message("Failed to save PrayerConfig");
        } else {
            serviceResponseBuilder.target(save.getId()).successful(true).message("Successfully saved PrayerConfig");
        }
        return serviceResponseBuilder.build();
    }

    @Override
    public Optional<PrayerConfig> getPrayerConfig(String companyId) {
        if (StringUtils.isBlank(companyId)) {
            return Optional.empty();
        }
        return prayerConfigRepository.findByCompanyId(companyId);
    }
}
