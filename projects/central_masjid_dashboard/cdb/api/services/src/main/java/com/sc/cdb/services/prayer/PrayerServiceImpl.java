package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.data.model.prayer.Prayer;
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

    public PrayerServiceImpl(CentralControlDao centralControlDao, PrayTimeCalculator prayTimeCalculator) {
        this.centralControlDao = centralControlDao;
        this.prayTimeCalculator = prayTimeCalculator;
    }

    @Override
    public ServiceResponse<String> createYearPrayerTimes(String companyId, PrayerConfig prayerConfig) {
        LOG.debug("Saving prayer config of {}", companyId);

        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();
        if (StringUtils.isBlank(companyId) || !isValid(prayerConfig)) {
            String errorMessage =
                    "Can not process request. CompanyId is blank or prayer configs not sent.";
            LOG.error(errorMessage);
            serviceResponseBuilder.message(errorMessage);
            return serviceResponseBuilder.build();
        }

        boolean saved = this.savePrayerConfig(companyId, prayerConfig);
        if (saved) {
            List<Prayer> prayers = prayTimeCalculator.generate(prayerConfig);
        }

        return serviceResponseBuilder.build();
    }

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
            centralControl.setPrayerConfig(prayerConfig);
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
