package com.sc.cdb.services.prayer;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

                Prayer prayer = findDatePrayerAndNextChange2(prayers, month, day);
                serviceResponseBuilder
                        .target(prayer)
                        .successful(true)
                        .message("Prayer found.");
            }
        }

        return serviceResponseBuilder.build();
    }


    private Prayer findDatePrayerAndNextChange2(List<Prayer> yearPrayers, int month, int date) {
        List<Prayer> yearPrayersMutable = new ArrayList<>(yearPrayers);
        yearPrayersMutable.sort(this::comparePrayers);
        // noinspection CollectionAddedToSelf
        yearPrayersMutable.addAll(yearPrayersMutable);

        Prayer foundPrayer = null;
        int foundIndex = -1;

        for (int i = 0; i < yearPrayersMutable.size(); i++) {
            if (comparePrayerMonthDate(yearPrayersMutable.get(i), month, date) < 0)
                continue;
            Prayer loopPrayer = yearPrayersMutable.get(i);
            if(foundPrayer == null && comparePrayerMonthDate(loopPrayer, month, date) == 0) {
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

    private int comparePrayerMonthDate(Prayer prayer, int month, int date) {
        if (prayer.getDate() == null) {
            return -1;
        }
        Calendar prayerCalendar = Calendar.getInstance();
        prayerCalendar.setTime(prayer.getDate());

        int prayerMonth = prayerCalendar.get(Calendar.MONTH) + 1;
        int prayerDate = prayerCalendar.get(Calendar.DATE);

        int result;
        if (prayerMonth > month) {
            result = 1;
        } else if (prayerMonth < month) {
            result = -1;
        } else {
            result = Integer.compare(prayerDate, date);
        }

        return result;
    }

    private int comparePrayers(Prayer prayer1, Prayer prayer2) {
        if (prayer1.getDate() == null && prayer2.getDate() == null) {
            return 0;
        } else if (prayer1.getDate() == null) {
            return 1;
        } else if (prayer2.getDate() == null) {
            return -1;
        }

        Calendar prayerCalendar2 = Calendar.getInstance();
        prayerCalendar2.setTime(prayer2.getDate());

        int prayerDate = prayerCalendar2.get(Calendar.DATE);
        int prayerMonth = prayerCalendar2.get(Calendar.MONTH) + 1;

        return this.comparePrayerMonthDate(prayer1, prayerMonth, prayerDate);
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


