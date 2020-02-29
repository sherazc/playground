package com.sc.cdb.services.bulk;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.prayer.PrayerComparator;
import com.sc.cdb.utils.CommonUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class PrayerValidatorImpl implements PrayerValidator {
    public static final String DATE_REGEX = "(0[1-9]|1[012]|[1-9])[- \\/.](0[1-9]|[12][0-9]|3[01]|[1-9])";
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
        if (StringUtils.isBlank(lineParts[0]) || !lineParts[0].matches(DATE_REGEX)) {
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
        if (StringUtils.isBlank(cellValue) || !cellValue.matches("([01]?[0-9]|2[0-3]):[0-5]?[0-9]")) {
            errors.put(
                    String.format("Line %d %s format", linNumber, fieldName),
                    "Invalid time. It should be 24h time, in HH-MM format.");
        }
        return errors;
    }

    @Override
    public Map<String, String> validatePrayer(Prayer prayer) {
        Map<String, String> errors = new HashMap<>();
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

        // TODO: Need to fix it
        errors.putAll(findAllPrayersExist(prayers));

        return errors;
    }

    private Map<? extends String, ? extends String> findAllPrayersExist(List<Prayer> prayers) {
        Map<String, String> errors = new HashMap<>();
        prayers.sort(prayerComparator);
        Calendar calendar = CommonUtils.createCalendar(2016, 0, 1);
        for (int i = 0; i <= 366; i++) {
            int loopDate = calendar.get(Calendar.DATE);
            int loopMonth = calendar.get(Calendar.MONTH);
            Date prayerDate = prayers.get(i).getDate();
            if (prayerDate != null) {
                Calendar prayerCalendar = Calendar.getInstance();
                prayerCalendar.setTime(prayerDate);
                int date = prayerCalendar.get(Calendar.DATE);
                int month = prayerCalendar.get(Calendar.MONTH);
                if (loopDate != date || loopMonth != month) {
                    errors.put("Missing prayer day", String.format("Missing %s/%s prayer row.", loopMonth, loopDate));
                    break;
                }
            }
            calendar.add(Calendar.DATE, 1);
        }
        return errors;
    }
}
