package com.sc.cdb.services.bulk;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.common.DateTimeCalculator;
import com.sc.cdb.services.prayer.PrayerComparator;
import com.sc.cdb.utils.CommonUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class PrayerValidatorImpl implements PrayerValidator {
    private PrayerComparator prayerComparator;

    public PrayerValidatorImpl(PrayerComparator prayerComparator) {
        this.prayerComparator = prayerComparator;
    }

    @Override
    public Map<String, String> validateCommaSeparatedLine(int linNumber, String line) {
        Map<String, String> errors = new HashMap<>();

        if (line.replaceAll("[^,]","").length() != 11) {
            errors.put("Line " + linNumber + " columns", "Do not contain enough columns. There should be 11 columns.");
            return errors;
        }

        String[] lineParts = line.split(",", -1);
        if (StringUtils.isBlank(lineParts[0]) || !lineParts[0].matches(DateTimeCalculator.MONTH_DATE_REGEX)) {
            errors.put("Line " + linNumber + " date format", "Invalid date. It should be in MM/DD format.");
        }
        errors.putAll(validatePrayerTime(linNumber, "Fajr", lineParts[1].trim(), true));
        errors.putAll(validatePrayerTime(linNumber, "Fajr Iqama", lineParts[2].trim(), false));

        errors.putAll(validatePrayerTime(linNumber, "Duhar", lineParts[3].trim(), true));
        errors.putAll(validatePrayerTime(linNumber, "Duhar Iqama", lineParts[4].trim(), false));

        errors.putAll(validatePrayerTime(linNumber, "Asr", lineParts[5].trim(), true));
        errors.putAll(validatePrayerTime(linNumber, "Asr Iqama", lineParts[6].trim(), false));

        errors.putAll(validatePrayerTime(linNumber, "Maghrib", lineParts[7].trim(), true));
        // errors.putAll(validatePrayerTime(linNumber, "Maghrib Iqama", lineParts[8].trim(), false));

        errors.putAll(validatePrayerTime(linNumber, "Isha", lineParts[9].trim(), true));
        errors.putAll(validatePrayerTime(linNumber, "Isha Iqama", lineParts[10].trim(), false));

        errors.putAll(validatePrayerTime(linNumber, "Sunrise", lineParts[11].trim(), false));

        return errors;
    }

    private Map<String, String> validatePrayerTime(int linNumber, String fieldName, String cellValue, boolean required) {
        Map<String, String> errors = new HashMap<>();
        if (!required && StringUtils.isBlank(cellValue)) {
            return errors;
        }
        if (StringUtils.isBlank(cellValue) || !cellValue.matches(DateTimeCalculator.TIME_24_REGEX)) {
            errors.put(
                    String.format("Line %d %s format", linNumber, fieldName),
                    "Invalid time. It should be 24h time, in HH-MM format.");
        }
        return errors;
    }

    @Override
    public Map<String, String> validatePrayer(Prayer prayer) {
        Map<String, String> errors = new HashMap<>();

        Optional<Calendar> fajrOptional = CommonUtils.parseTimeString(prayer.getFajr());
        Optional<Calendar> fajrIqamaOptional = CommonUtils.parseTimeString(prayer.getFajr());
        Optional<Calendar> dhuhrOptional = CommonUtils.parseTimeString(prayer.getDhuhr());
        Optional<Calendar> dhuhrIqamaOptional = CommonUtils.parseTimeString(prayer.getDhuhrIqama());
        Optional<Calendar> asrOptional = CommonUtils.parseTimeString(prayer.getAsr());
        Optional<Calendar> asrIqamaOptional = CommonUtils.parseTimeString(prayer.getAsrIqama());
        Optional<Calendar> maghribOptional = CommonUtils.parseTimeString(prayer.getMaghrib());
        Optional<Calendar> maghribIqamaOptional = CommonUtils.parseTimeString(prayer.getMaghribIqama());
        Optional<Calendar> ishaOptional = CommonUtils.parseTimeString(prayer.getIsha());
        Optional<Calendar> ishaIqamaOptional = CommonUtils.parseTimeString(prayer.getIshaIqama());
        Optional<Calendar> sunriseOptional = CommonUtils.parseTimeString(prayer.getSunrise());

        return errors;
    }

    @Override
    public Map<String, String> validatePrayers(List<Prayer> prayers) {
        Map<String, String> errors = new HashMap<>();
        int prayerSize = prayers.size();
        if (prayerSize != 366) {
            errors.put("Invalid file", "Import file do not contain 366 records. Total records in file " + prayerSize);
            return errors;
        }

        errors.putAll(findAllPrayersExist(prayers));
        prayers.forEach(prayer -> errors.putAll(validatePrayer(prayer)));
        return errors;
    }

    private Map<? extends String, ? extends String> findAllPrayersExist(List<Prayer> prayers) {
        Map<String, String> errors = new HashMap<>();
        prayers.sort(prayerComparator);
        Calendar calendar = CommonUtils.createCalendarDate(DateTimeCalculator.DEFAULT_YEAR, 0, 1);
        for (int i = 0; i < 366; i++) {
            int loopDate = calendar.get(Calendar.DATE);
            int loopMonth = calendar.get(Calendar.MONTH);
            Date prayerDate = prayers.get(i).getDate();
            if (prayerDate != null) {
                Calendar prayerCalendar = Calendar.getInstance();
                prayerCalendar.setTime(prayerDate);
                int date = prayerCalendar.get(Calendar.DATE);
                int month = prayerCalendar.get(Calendar.MONTH);
                if (loopDate != date || loopMonth != month) {
                    errors.put("Missing prayer day", String.format("Missing %s/%s prayer row.", loopMonth + 1, loopDate));
                    break;
                }
            }
            calendar.add(Calendar.DATE, 1);
        }
        return errors;
    }
}
