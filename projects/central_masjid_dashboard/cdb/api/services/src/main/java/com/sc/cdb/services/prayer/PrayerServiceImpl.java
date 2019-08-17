package com.sc.cdb.services.prayer;

import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayerServiceImpl implements PrayerService {
    private static final Logger LOG = LoggerFactory.getLogger(PrayerServiceImpl.class);

    private CentralControlDao centralControlDao;
    private PrayTimeCalculator prayTimeCalculator;
    private PrayerConfigRepository prayerConfigRepository;

    public PrayerServiceImpl(
            CentralControlDao centralControlDao,
            PrayTimeCalculator prayTimeCalculator,
            PrayerConfigRepository prayerConfigRepository) {
        this.centralControlDao = centralControlDao;
        this.prayTimeCalculator = prayTimeCalculator;
        this.prayerConfigRepository = prayerConfigRepository;
    }

    @Override
    public ServiceResponse<?> updatePrayerConfig(String companyId, PrayerConfig prayerConfig) {
        return null;
    }

    // TODO: Work on save prayer config
    @Override
    public ServiceResponse<List<Prayer>> createYearPrayerTimes(String companyId, PrayerConfig prayerConfig) {
        LOG.debug("Saving prayer config of {}", companyId);

        ServiceResponse.ServiceResponseBuilder<List<Prayer>> serviceResponseBuilder = ServiceResponse.builder();
        if (StringUtils.isBlank(companyId) || !isValid(prayerConfig)) {
            String errorMessage =
                    "Can not process request. CompanyId is blank or prayer configs not sent.";
            LOG.error(errorMessage);
            serviceResponseBuilder.message(errorMessage);
            return serviceResponseBuilder.build();
        }

        List<Prayer> prayers = prayTimeCalculator.generate(prayerConfig);

        if (prayers != null && prayers.size() == 366) {
            serviceResponseBuilder.successful(true);
            serviceResponseBuilder.target(prayers);
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

    // TODO: Work on save prayer config
    private boolean savePrayerConfig(String companyId, PrayerConfig prayerConfig) {
        boolean saved;
        if (centralControlDao.isCentralControlExists(companyId)) {
            saved = centralControlDao.updatePrayerConfig(companyId, prayerConfig);
            if (saved) {
                LOG.debug("Updated Prayer config of {}", companyId);
            } else {
                LOG.error("Failed to update Prayer config of {}", companyId);
            }
        } else {
            CentralControl centralControl = new CentralControl();
            centralControl.setCompanyId(companyId);
            // centralControl.setPrayerConfig(prayerConfig);
            CentralControl savedCentralControl = centralControlDao.save(centralControl);
            saved = savedCentralControl != null && StringUtils.isNotBlank(savedCentralControl.getId());
            if (saved) {
                LOG.debug("Saved new Prayer config of {}", companyId);
            } else {
                LOG.error("Failed to save new Prayer config of {}", companyId);
            }
        }
        return saved;
    }

    public boolean isValid(PrayerConfig prayerConfig) {
        // TODO validate full prayer config.
        return prayerConfig != null && prayerConfig.getGeoCode() != null;
    }
}
