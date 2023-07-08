package com.sc.cdb.services.prayer;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;

import com.sc.cdb.data.dao.PrayerConfigDao;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.auth.CompanyService;
import com.sc.cdb.services.bulk.PrayerValidator;
import com.sc.cdb.services.common.CustomConfigurationsService;
import com.sc.cdb.services.dst.PrayerConfigDstApplier;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.version.DbVersionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrayerConfigServiceImpl implements PrayerConfigService {

    private final PrayerConfigRepository prayerConfigRepository;
    private final PrayerConfigDao prayerConfigDao;
    private final PrayerConfigDstApplier prayerConfigDstApplier;
    private final CompanyService companyService;
    private final PrayerComparator prayerComparator;
    private final PrayerValidator prayerValidator;
    private final CustomConfigurationsService customConfigurationsService;
    private final DbVersionService dbVersionService;

    @Override
    public ServiceResponse<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day) {
        ServiceResponse.ServiceResponseBuilder<Prayer> serviceResponseBuilder = ServiceResponse.builder();
        boolean valid = validatePrayerDayArguments(serviceResponseBuilder, companyId, month, day);
        if (valid) {
            populateSinglePrayerDayResponse(serviceResponseBuilder, companyId, month, day);
        }
        return serviceResponseBuilder.build();
    }

    public ServiceResponse<List<Prayer>> getPrayersPageByCompanyIdMonthAndDay(String companyId, int month, int day, int length) {
        ServiceResponse.ServiceResponseBuilder<List<Prayer>> serviceResponseBuilder = ServiceResponse.builder();
        boolean valid = validatePrayerDayArguments(serviceResponseBuilder, companyId, month, day);
        if (valid && length < 1 || length > 366) {
            serviceResponseBuilder.successful(false).message("Invalid length");
        }
        if (valid) {

        }
        return serviceResponseBuilder.build();
    }


    private boolean validatePrayerDayArguments(ServiceResponse.ServiceResponseBuilder<?> serviceResponseBuilder,
                                            String companyId, int month, int day) {
        boolean valid = true;
        if (month > 12 || month < 1) {
            serviceResponseBuilder.successful(false).message("Invalid Month");
            valid = false;
        } else if (day > 31 || day < 1) {
            serviceResponseBuilder.successful(false).message("Invalid Day");
            valid = false;
        } else if (StringUtils.isBlank(companyId)) {
            serviceResponseBuilder.successful(false).message("Invalid CompanyId");
            valid = false;
        }
        return valid;
    }

    private void populateSinglePrayerDayResponse(
            ServiceResponse.ServiceResponseBuilder<Prayer> serviceResponseBuilder,
            String companyId, int month, int day) {
        Optional<PrayerConfig> prayerConfigOptional = getPrayerConfig(companyId);

        if (prayerConfigOptional.isEmpty()) {
            serviceResponseBuilder.successful(false).message("PrayerConfig not found.");
        } else {
            List<Prayer> prayers = prayerConfigOptional.get().getPrayers();
            if (prayers == null || prayers.isEmpty()) {
                serviceResponseBuilder.successful(false).message("Prayer not found.");
            } else {

                // Duplicated prayers in its self to find next year change
                List<Prayer> twoYearPrayers = doublePrayers(prayers);

                Prayer prayer = findDatePrayerAndNextChange(twoYearPrayers, month, day);
                overrideIqamas(companyId, Collections.singletonList(prayer));
                serviceResponseBuilder
                        .target(prayer)
                        .successful(true)
                        .message("Prayer found.");
            }
        }
    }

    public void overrideIqamas(String companyId, List<Prayer> prayers) {
        List<CustomConfiguration> configs = customConfigurationsService.getAllConfig(companyId);
        if (configs == null || configs.isEmpty() || prayers == null || prayers.isEmpty()) {
            return;
        }

        overrideIqama(configs, "fajr_iqama", s ->
            prayers.forEach(p -> {
                p.setFajrIqama(s);
                p.setFajrChange(null);
                p.setFajrChangeDate(null);
            })
        );

        overrideIqama(configs, "zuhar_iqama", s ->
            prayers.forEach(p -> {
                p.setDhuhrIqama(s);
                p.setDhuhrChange(null);
                p.setDhuhrChangeDate(null);
            })
        );

        overrideIqama(configs, "asr_iqama", s ->
            prayers.forEach(p -> {
                p.setAsrIqama(s);
                p.setAsrChange(null);
                p.setAsrChangeDate(null);
            })
        );

        overrideIqama(configs, "maghrib_iqama", s ->
            prayers.forEach(p -> {
                p.setMaghribIqama(s);
                p.setMaghribChange(null);
                p.setMaghribChangeDate(null);
            })
        );

        overrideIqama(configs, "isha_iqama", s ->
            prayers.forEach(p -> {
                p.setIshaIqama(s);
                p.setIshaChange(null);
                p.setIshaChangeDate(null);
            })
        );
    }

    private void overrideIqama(List<CustomConfiguration> configs, String configName, Consumer<String> consumer) {
        configs.stream()
                .filter(c -> StringUtils.equals(c.getName(), configName))
                .findFirst()
                .filter(c -> StringUtils.isNotBlank(c.getValue()))
                .ifPresent(c -> consumer.accept(c.getValue()));
    }


    private Optional<CustomConfiguration> getConfigByName(List<CustomConfiguration> configs, String name) {
        if (configs == null || configs.isEmpty()) {
            return Optional.empty();
        }
        return configs.stream()
                .filter(c -> StringUtils.equals(c.getName(), name))
                .findFirst();
    }

    @Override
    public ServiceResponse<String> saveDst(String companyId, Dst dst) {
        log.debug("Saving DST. companyId = {}", companyId);
        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();

        if (StringUtils.isBlank(companyId) || dst == null) {
            serviceResponseBuilder
                    .target("failed")
                    .successful(false)
                    .message("CompanyID or DST is null");
        } else {
            boolean updated = prayerConfigDao.updateDst(companyId, dst);
            if (updated) {
                dbVersionService.upgradeCompanyDataVersion(companyId);
                serviceResponseBuilder
                        .target("successful")
                        .successful(true)
                        .message("Successfully updated DST");
            } else {
                serviceResponseBuilder
                        .target("failed")
                        .successful(false)
                        .message("Failed to update DST");
            }
        }
        return serviceResponseBuilder.build();
    }


    private List<Prayer> doublePrayers(List<Prayer> prayers) {
        List<Prayer> prayersMutable = new ArrayList<>(prayers);
        prayersMutable.sort(prayerComparator);
        // Duplicated prayers in its self to find next year change
        // noinspection CollectionAddedToSelf
        prayersMutable.addAll(prayersMutable);
        return prayersMutable;
    }

    private Prayer findDatePrayerAndNextChange(List<Prayer> twoYearPrayers, int month, int date) {

        Prayer foundPrayer = null;
        int foundIndex = -1;

        for (int i = 0; i < twoYearPrayers.size(); i++) {
            // Because of below condition it was unable to find next year change
            // comparePrayerMonthDate() args month and date for the next year was not
            // considered to be greater value.
            // if (comparePrayerMonthDate(yearPrayersMutable.get(i), month, date) < 0)
            //  continue;
            Prayer loopPrayer = twoYearPrayers.get(i);
            if (foundPrayer == null && prayerComparator.comparePrayerMonthDate(loopPrayer, month, date) == 0) {
                foundPrayer = loopPrayer;
                foundIndex = i;
            }

            if (foundIndex > -1) {
                setPrayerNextChange(foundPrayer, loopPrayer);
            }
        }
        return foundPrayer;
    }

    private void setPrayerNextChange(Prayer foundPrayer, Prayer loopPrayer) {
        if (StringUtils.isNotBlank(foundPrayer.getFajrIqama())
                && StringUtils.isBlank(foundPrayer.getFajrChange())
                && StringUtils.isNotBlank(loopPrayer.getFajrIqama())
                && !StringUtils.equals(foundPrayer.getFajrIqama(), loopPrayer.getFajrIqama())
                && loopPrayer.getDate() != null) {
            foundPrayer.setFajrChangeDate(dateToCurrentYearData(loopPrayer.getDate()));
            foundPrayer.setFajrChange(loopPrayer.getFajrIqama());
        }

        if (StringUtils.isNotBlank(foundPrayer.getDhuhrIqama())
                && StringUtils.isBlank(foundPrayer.getDhuhrChange())
                && StringUtils.isNotBlank(loopPrayer.getDhuhrIqama())
                && !StringUtils.equals(foundPrayer.getDhuhrIqama(), loopPrayer.getDhuhrIqama())
                && loopPrayer.getDate() != null) {
            foundPrayer.setDhuhrChangeDate(dateToCurrentYearData(loopPrayer.getDate()));
            foundPrayer.setDhuhrChange(loopPrayer.getDhuhrIqama());
        }

        if (StringUtils.isNotBlank(foundPrayer.getAsrIqama())
                && StringUtils.isBlank(foundPrayer.getAsrChange())
                && StringUtils.isNotBlank(loopPrayer.getAsrIqama())
                && !StringUtils.equals(foundPrayer.getAsrIqama(), loopPrayer.getAsrIqama())
                && loopPrayer.getDate() != null) {
            foundPrayer.setAsrChangeDate(dateToCurrentYearData(loopPrayer.getDate()));
            foundPrayer.setAsrChange(loopPrayer.getAsrIqama());
        }

        if (StringUtils.isNotBlank(foundPrayer.getIshaIqama())
                && StringUtils.isBlank(foundPrayer.getIshaChange())
                && StringUtils.isNotBlank(loopPrayer.getIshaIqama())
                && !StringUtils.equals(foundPrayer.getIshaIqama(), loopPrayer.getIshaIqama())
                && loopPrayer.getDate() != null) {
            foundPrayer.setIshaChangeDate(dateToCurrentYearData(loopPrayer.getDate()));
            foundPrayer.setIshaChange(loopPrayer.getIshaIqama());
        }
    }

    private Date dateToCurrentYearData(Date date) {
        Calendar calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        calendar.setTime(date);
        calendar.set(Calendar.YEAR, currentYear);
        return calendar.getTime();
    }

    @Override
    public ServiceResponse<String> savePrayerConfig(PrayerConfig prayerConfig) {
        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();

        int todayYear = Calendar.getInstance().get(Calendar.YEAR);

        prayerConfigDstApplier.addHour(prayerConfig, todayYear, -1);

        Map<String, String> fieldErrors = prayerValidator.validatePrayers(prayerConfig.getPrayers());

        if (fieldErrors.size() > 0) {
            serviceResponseBuilder
                    .successful(false)
                    .message("Failed to save PrayerConfig")
                    .fieldErrors(fieldErrors);
        } else {
            attemptUpgradeCompanyListVersion(prayerConfig);
            PrayerConfig save = prayerConfigRepository.save(prayerConfig);
            if (save == null || StringUtils.isBlank(save.getId())) {
                serviceResponseBuilder.successful(false).message("Failed to save PrayerConfig");
            } else {
                log.debug("Saved PrayerConfig. companyId = {}", prayerConfig.getCompanyId());
                dbVersionService.upgradeCompanyDataVersion(prayerConfig.getCompanyId());
                serviceResponseBuilder.target(save.getId()).successful(true).message("Successfully saved PrayerConfig");
            }
        }
        return serviceResponseBuilder.build();
    }

    private void attemptUpgradeCompanyListVersion(PrayerConfig prayerConfig) {
        if (prayerConfig == null || StringUtils.isBlank(prayerConfig.getId())) {
            return;
        }
        Optional<PrayerConfig> existingPrayerConfig = prayerConfigRepository.findById(prayerConfig.getId());
        existingPrayerConfig.ifPresent(p -> {
            // if new year prayers are being saved.
            if ((p.getPrayers() == null || p.getPrayers().isEmpty())
                    && (prayerConfig.getPrayers() != null && !prayerConfig.getPrayers().isEmpty())) {
                dbVersionService.upgradeCompanyListVersion();
            }
        });
    }

    @Override
    public Optional<PrayerConfig> getPrayerConfig(String companyId) {
        if (StringUtils.isBlank(companyId)) {
            return Optional.empty();
        }
        Optional<PrayerConfig> prayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        if (prayerConfigOptional.isEmpty()) {
            prayerConfigOptional = createDefaultPrayerConfigIfCompanyExists(companyId);
        }

        int todayYear = Calendar.getInstance().get(Calendar.YEAR);

        prayerConfigOptional.ifPresent(prayerConfig
                -> prayerConfigDstApplier.addHour(prayerConfig, todayYear, 1));
        return prayerConfigOptional;
    }

    private Optional<PrayerConfig> createDefaultPrayerConfigIfCompanyExists(
            String companyId) {
        Optional<Company> companyOptional = companyService.findCompanyById(companyId);
        Optional<PrayerConfig> prayerConfigOptional;

        if (companyOptional.isPresent()) {
            PrayerConfig prayerConfig = new PrayerConfig();
            prayerConfig.setCompanyId(companyId);
            prayerConfig.setDst(new Dst());
            prayerConfig.setGeoCode(new GeoCode());
            prayerConfigOptional = Optional.of(prayerConfig);
        } else {
            prayerConfigOptional = Optional.empty();
        }

        return prayerConfigOptional;
    }
}
