package com.sc.cdb.services.prayer;

import java.text.SimpleDateFormat;
import java.util.Date;
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
    private static final SimpleDateFormat MONTH_DATE_FORMAT = new SimpleDateFormat("MMdd");

    private CentralControlDao centralControlDao;
    private PrayTimeCalculator prayTimeCalculator;
    private PrayerConfigRepository prayerConfigRepository;
    private IqamahCalculator iqamahCalculator;

    public PrayerServiceImpl(
            CentralControlDao centralControlDao,
            PrayTimeCalculator prayTimeCalculator,
            PrayerConfigRepository prayerConfigRepository,
            IqamahCalculator iqamahCalculator) {
        this.centralControlDao = centralControlDao;
        this.prayTimeCalculator = prayTimeCalculator;
        this.prayerConfigRepository = prayerConfigRepository;
        this.iqamahCalculator = iqamahCalculator;
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
    public ServiceResponse<PrayerConfig> createYearPrayerTimes(PrayerConfig prayerConfig, Boolean generateIqamah) {
        LOG.debug("Saving prayer config of {}", prayerConfig.getCompanyId());

        ServiceResponse.ServiceResponseBuilder<PrayerConfig> serviceResponseBuilder = ServiceResponse.builder();
        if (StringUtils.isBlank(prayerConfig.getCompanyId()) || !isValid(prayerConfig)) {
            String errorMessage =
                    "Can not process request. CompanyId is blank or prayer configs not sent.";
            LOG.error(errorMessage);
            serviceResponseBuilder.message(errorMessage);
            return serviceResponseBuilder.build();
        }

        List<Prayer> prayers = prayTimeCalculator.generate(prayerConfig);

        if (prayers != null && prayers.size() == 366) {
            prayerConfig.setPrayers(prayers);

            prayers.forEach(prayer -> {
                if (generateIqamah != null && generateIqamah) {
                    autoGenerateIqamah(prayer);
                }
            });

            if (generateIqamah != null && generateIqamah) {
                mergeExistingIqamahTimes(prayerConfig);
            }

            serviceResponseBuilder.successful(true);
            serviceResponseBuilder.target(prayerConfig);
        }

        return serviceResponseBuilder.build();
    }

    private void mergeExistingIqamahTimes(PrayerConfig prayerConfig) {
        Optional<PrayerConfig> existingPrayerConfig = getPrayerConfig(prayerConfig.getCompanyId());

        if (existingPrayerConfig.isPresent()
                && existingPrayerConfig.get().getPrayers() != null
                && existingPrayerConfig.get().getPrayers().size() > 0) {

            List<Prayer> existingPrayers = existingPrayerConfig.get().getPrayers();
            List<Prayer> newPrayers = prayerConfig.getPrayers();

            newPrayers.forEach(prayer -> {

                String newMonthDate = dateToMonthDateString(prayer.getDate());

                existingPrayers
                        .stream()
                        .filter(existingPrayer -> StringUtils.equals(newMonthDate, dateToMonthDateString(existingPrayer.getDate())))
                        .findFirst()
                        .ifPresent(existingSameDatePrayer -> mergeExistingIqamahTime(existingSameDatePrayer, prayer));
            });
        }
    }

    private void mergeExistingIqamahTime(Prayer iqamahFromPrayer, Prayer iqamahToPrayer) {
        iqamahToPrayer.setFajrIqama(iqamahFromPrayer.getFajrIqama());
        iqamahToPrayer.setDhuhrIqama(iqamahFromPrayer.getDhuhrIqama());
        iqamahToPrayer.setAsrIqama(iqamahFromPrayer.getAsrIqama());
        iqamahToPrayer.setMaghribIqama(iqamahFromPrayer.getMaghribIqama());
        iqamahToPrayer.setIshaIqama(iqamahFromPrayer.getIshaIqama());
    }

    private void autoGenerateIqamah(Prayer prayer) {

        prayer.setFajrIqama(iqamahCalculator.calculate(
                prayer.getFajr(), 10,
                IqamahCalculator.MinutesRound.roundTo15));

        prayer.setDhuhrIqama(iqamahCalculator.calculate(
                prayer.getDhuhr(), 20,
                IqamahCalculator.MinutesRound.roundTo30));

        prayer.setAsrIqama(iqamahCalculator.calculate(
                prayer.getAsr(), 20,
                IqamahCalculator.MinutesRound.roundTo30));

        prayer.setMaghribIqama(iqamahCalculator.calculate(
                prayer.getMaghrib(), 5,
                IqamahCalculator.MinutesRound.noRound));

        prayer.setIshaIqama(iqamahCalculator.calculate(
                prayer.getIsha(), 10,
                IqamahCalculator.MinutesRound.roundTo15));
    }

    private String dateToMonthDateString(Date date) {
        if(date == null) {
            return "";
        }
        return MONTH_DATE_FORMAT.format(date);
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
