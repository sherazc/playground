package com.sc.cdb.services.prayer;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.TreeMap;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

import com.sc.cdb.data.dao.PrayerConfigDao;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.SerializationUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PrayerConfigServiceImpl implements PrayerConfigService {
    private static final Logger LOG = LoggerFactory.getLogger(PrayerConfigServiceImpl.class);
    private static final SimpleDateFormat SDF_MM_DD = new SimpleDateFormat("MMdd");

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

                Prayer prayer = findDatePrayerAndNextChange(prayers, month, day);
                serviceResponseBuilder
                        .target(prayers.get(0))
                        .successful(true)
                        .message("Prayer found.");
            }
        }

        return serviceResponseBuilder.build();
    }

    private Prayer findDatePrayerAndNextChange(List<Prayer> yearPrayers, int month, int date) {

        Optional<Prayer> foundPrayerOptional = yearPrayers.stream()
                .filter(prayer -> comparePrayerMonthDate(prayer, month, date))
                .findFirst();

        if (foundPrayerOptional.isEmpty()) {
            return null;
        }

        List<Prayer> yearPrayersMutable = new ArrayList<>(yearPrayers);
        yearPrayersMutable.sort(this::comparePrayers);

        // noinspection CollectionAddedToSelf
        yearPrayersMutable.addAll(yearPrayersMutable);




        /*
        List<Prayer> yearPrayerClone = yearPrayersMutable.stream()
                .map(SerializationUtils::clone)
                .collect(Collectors.toList());


        TreeMap<String, Prayer> twoYearPrayers = yearPrayers.stream()
                .collect(
                        TreeMap::new, // supplier
                        this::duplicatePrayers, // accumulator
                        TreeMap::putAll // combiner - combine second into first
                );


        yearPrayers.stream().sorted(this::comparePrayers)
                .collect(ArrayList::new,
                        null,
                        List::addAll);


        System.out.println(twoYearPrayers);
        */

        return null;
    }

    private boolean comparePrayerMonthDate(Prayer prayer, int month, int date) {
        if (prayer.getDate() == null) {
            return false;
        }
        Calendar prayerCalendar = Calendar.getInstance();
        prayerCalendar.setTime(prayer.getDate());

        return prayerCalendar.get(Calendar.MONTH) + 1 == month
                && prayerCalendar.get(Calendar.DATE) == date;
    }


    private int comparePrayers(Prayer p1, Prayer p2) {
        if (p1.getDate() == null && p2.getDate() == null) {
            return 0;
        }

        if (p1.getDate() == null && p2.getDate() != null) {
            return -1;
        }

        if (p1.getDate() != null && p2.getDate() == null) {
            return 1;
        }
        return SDF_MM_DD.format(p1.getDate()).compareTo(SDF_MM_DD.format(p2.getDate()));
    }


    private void duplicatePrayers(TreeMap<String, Prayer> prayerMap, Prayer prayer) {
        if (prayer.getDate() == null) {
            return;
        }

        String mmdd = SDF_MM_DD.format(prayer.getDate());
        prayerMap.put("1" + mmdd, prayer);
        prayerMap.put("2" + mmdd, prayer);
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
