package com.sc.cdb.services.prayer;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayerServiceImpl implements PrayerService {
    private static final Logger LOG = LoggerFactory.getLogger(PrayerServiceImpl.class);

    private CentralControlDao centralControlDao;

    public PrayerServiceImpl(CentralControlDao centralControlDao) {
        this.centralControlDao = centralControlDao;
    }

    @Override
    public ServiceResponse<String> savePrayerConfig(String companyId, PrayerConfig prayerConfig) {
        LOG.debug("Saving prayer config of {}", companyId);

        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();
        if (StringUtils.isBlank(companyId) || !isValid(prayerConfig)) {
            String errorMessage =
                    "Can not process request. CompanyId is blank or prayer configs not sent.";
            LOG.error(errorMessage);
            serviceResponseBuilder.message(errorMessage);
            return serviceResponseBuilder.build();
        }

        if (centralControlDao.isCentralControlExists(companyId)) {
            boolean updated = centralControlDao.updatePrayerConfig(companyId, prayerConfig);
            if (updated) {
                serviceResponseBuilder.successful(true);
                String message = String.format("Updated Prayer config of %s", companyId);
                serviceResponseBuilder.message(message);
                LOG.debug(message);
            }
        } else {
            CentralControl centralControl = new CentralControl();
            centralControl.setCompanyId(companyId);
            centralControl.setPrayerConfig(prayerConfig);
            CentralControl savedCentralControl = centralControlDao.save(centralControl);
            if (savedCentralControl != null && StringUtils.isNotBlank(savedCentralControl.getId())) {
                serviceResponseBuilder.successful(true);
                String message = String.format("Saved Prayer config of %s", companyId);
                serviceResponseBuilder.message(message);
                LOG.debug(message);
            }
        }
        return serviceResponseBuilder.build();
    }

    public boolean isValid(PrayerConfig prayerConfig) {
        // TODO validate full prayer config.
        return prayerConfig != null && prayerConfig.getGeoCode() != null;
    }
}
