package com.sc.cdb.services.prayer;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.dst.PrayerConfigDstApplier;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.utils.CdbDateUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayerServiceImpl implements PrayerService {
    private static final Logger LOG = LoggerFactory.getLogger(PrayerServiceImpl.class);
    private static final SimpleDateFormat MONTH_DATE_FORMAT = new SimpleDateFormat("MMdd");

    private PrayTimeCalculator prayTimeCalculator;
    private IqamahCalculator iqamahCalculator;
    private PrayerConfigService prayerConfigService;
    private PrayerConfigDstApplier prayerConfigDstApplier;


    public PrayerServiceImpl(
            PrayTimeCalculator prayTimeCalculator,
            IqamahCalculator iqamahCalculator,
            PrayerConfigService prayerConfigService,
            PrayerConfigDstApplier prayerConfigDstApplier) {
        this.prayTimeCalculator = prayTimeCalculator;
        this.iqamahCalculator = iqamahCalculator;
        this.prayerConfigService = prayerConfigService;
        this.prayerConfigDstApplier = prayerConfigDstApplier;
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

            if (generateIqamah == null || !generateIqamah) {
                mergeExistingIqamahTimes(prayerConfig);
            }
            int todayYear = CdbDateUtils.todayUtc().get(Calendar.YEAR);
            prayerConfigDstApplier.addHoursToDstPeriod(prayerConfig, todayYear, 1);

            serviceResponseBuilder.successful(true);
            serviceResponseBuilder.target(prayerConfig);
        }

        return serviceResponseBuilder.build();
    }

    private void mergeExistingIqamahTimes(PrayerConfig prayerConfig) {
        Optional<PrayerConfig> existingPrayerConfig = prayerConfigService.getPrayerConfig(prayerConfig.getCompanyId());

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
        if (date == null) {
            return "";
        }
        return MONTH_DATE_FORMAT.format(date);
    }

    public boolean isValid(PrayerConfig prayerConfig) {
        // TODO validate full prayer config.
        return prayerConfig != null && prayerConfig.getGeoCode() != null;
    }
}
