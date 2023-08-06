package com.sc.cdb.services.bulk;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.prayer.PrayerComparator;
import com.sc.cdb.utils.CdbDateUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class PrayerValidatorImpl implements PrayerValidator {
    private PrayerComparator prayerComparator;

    public PrayerValidatorImpl(PrayerComparator prayerComparator) {
        this.prayerComparator = prayerComparator;
    }

    @Override
    public Map<String, String> validateCommaSeparatedLine(int lineNumber, String line) {
        Map<String, String> errors = new HashMap<>();

        if (line.replaceAll("[^,]","").length() != 11) {
            errors.put("Line " + lineNumber + " columns", "Do not contain enough columns. There should be 11 columns.");
            return errors;
        }

        String[] lineParts = line.split(",", -1);
        if (StringUtils.isBlank(lineParts[0]) || !lineParts[0].trim().matches(CdbDateUtils.MONTH_DATE_REGEX)) {
            errors.put("Line " + lineNumber + " date format",
                    "Invalid date. It should be in MM/DD format. It is " + lineParts[0].trim());
        }
        errors.putAll(validatePrayerTime(lineNumber, "Fajr", lineParts[1].trim(), true));
        errors.putAll(validatePrayerTime(lineNumber, "Fajr Iqama", lineParts[2].trim(), false));

        errors.putAll(validatePrayerTime(lineNumber, "Duhar", lineParts[3].trim(), true));
        errors.putAll(validatePrayerTime(lineNumber, "Duhar Iqama", lineParts[4].trim(), false));

        errors.putAll(validatePrayerTime(lineNumber, "Asr", lineParts[5].trim(), true));
        errors.putAll(validatePrayerTime(lineNumber, "Asr Iqama", lineParts[6].trim(), false));

        errors.putAll(validatePrayerTime(lineNumber, "Maghrib", lineParts[7].trim(), true));
        // errors.putAll(validatePrayerTime(lineNumber, "Maghrib Iqama", lineParts[8].trim(), false));

        errors.putAll(validatePrayerTime(lineNumber, "Isha", lineParts[9].trim(), true));
        errors.putAll(validatePrayerTime(lineNumber, "Isha Iqama", lineParts[10].trim(), false));

        errors.putAll(validatePrayerTime(lineNumber, "Sunrise", lineParts[11].trim(), false));

        return errors;
    }

    private Map<String, String> validatePrayerTime(int lineNumber, String fieldName, String cellValue, boolean required) {
        Map<String, String> errors = new HashMap<>();
        if (!required && StringUtils.isBlank(cellValue)) {
            return errors;
        }
        if (StringUtils.isBlank(cellValue) || !cellValue.matches(CdbDateUtils.TIME_24_REGEX)) {
            errors.put(
                    String.format("Line %d %s format", lineNumber, fieldName),
                    "Invalid time. It should be 24h time, in HH:MM format. It is " + cellValue);
        }
        return errors;
    }

    @Override
    public Map<String, String> validatePrayer(Prayer prayer) {
        Map<String, String> errors = new HashMap<>();

        String prayerDateString = CdbDateUtils.DATE_FORMAT.format(prayer.getDate());

        Optional<Calendar> fajrOptional = CdbDateUtils.parseTimeString(prayer.getFajr());
        Optional<Calendar> fajrIqamaOptional = CdbDateUtils.parseTimeString(prayer.getFajrIqama());
        Optional<Calendar> dhuhrOptional = CdbDateUtils.parseTimeString(prayer.getDhuhr());
        Optional<Calendar> dhuhrIqamaOptional = CdbDateUtils.parseTimeString(prayer.getDhuhrIqama());
        Optional<Calendar> asrOptional = CdbDateUtils.parseTimeString(prayer.getAsr());
        Optional<Calendar> asrIqamaOptional = CdbDateUtils.parseTimeString(prayer.getAsrIqama());
        Optional<Calendar> maghribOptional = CdbDateUtils.parseTimeString(prayer.getMaghrib());
        // Optional<Calendar> maghribIqamaOptional = CommonUtils.parseTimeString(prayer.getMaghribIqama());
        Optional<Calendar> ishaOptional = CdbDateUtils.parseTimeString(prayer.getIsha());
        Optional<Calendar> ishaIqamaOptional = CdbDateUtils.parseTimeString(prayer.getIshaIqama());
        Optional<Calendar> sunriseOptional = CdbDateUtils.parseTimeString(prayer.getSunrise());

        validateRange(fajrOptional.get(), fajrIqamaOptional, prayerDateString, errors, "Fajr", "Fajr Iqama");
        validateRange(fajrOptional.get(), sunriseOptional, prayerDateString, errors, "Fajr", "Sunrise");
        validateRange(fajrOptional.get(), dhuhrOptional.get(), prayerDateString, errors, "Fajr", "Dhuhr");

        validateRange(fajrIqamaOptional, dhuhrOptional.get(), prayerDateString, errors, "Fajr Iqama", "Dhuhr");
        validateRange(fajrIqamaOptional, sunriseOptional, prayerDateString, errors, "Fajr Iqama", "Sunrise");
        validateRange(sunriseOptional, dhuhrOptional.get(), prayerDateString, errors, "Sunrise", "Dhuhr");

        validateRange(dhuhrOptional.get(), dhuhrIqamaOptional, prayerDateString, errors, "Dhuhr", "Dhuhr Iqama");
        validateRange(dhuhrOptional.get(), asrOptional.get(), prayerDateString, errors, "Dhuhr", "Asr");
        validateRange(dhuhrIqamaOptional, asrOptional.get(), prayerDateString, errors, "Dhuhr Iqama", "Asr");

        validateRange(asrOptional.get(), asrIqamaOptional, prayerDateString, errors, "Asr", "Asr Iqama");
        validateRange(asrOptional.get(), maghribOptional.get(), prayerDateString, errors, "Asr", "Maghrib");
        validateRange(asrIqamaOptional, maghribOptional.get(), prayerDateString, errors, "Asr Iqama", "Maghrib");

        validateRange(maghribOptional.get(), ishaOptional.get(), prayerDateString, errors, "Maghrib", "Isha");

        validateRange(ishaOptional.get(), ishaIqamaOptional, prayerDateString, errors, "Isha", "Isha Iqama");

        return errors;
    }

    private void validateRange(Optional<Calendar> calendarOptional1, Optional<Calendar> calendarOptional2, String prayerDateString,
                               Map<String, String> errors, String field1, String field2) {
        if (calendarOptional1.isEmpty() && calendarOptional2.isEmpty()) {
            return;
        }

        if (calendarOptional1.isPresent() && calendarOptional2.isEmpty()) {
            validateRange(calendarOptional1.get(), calendarOptional2, prayerDateString, errors, field1, field2);
        }

        if (calendarOptional1.isEmpty() && calendarOptional2.isPresent()) {
            validateRange(calendarOptional1, calendarOptional2.get(), prayerDateString, errors, field1, field2);
        }

        if (calendarOptional1.isPresent() && calendarOptional2.isPresent()) {
            validateRange(calendarOptional1.get(), calendarOptional2.get(), prayerDateString, errors, field1, field2);
        }
    }

    private void validateRange(Optional<Calendar> calendarOptional, Calendar calendar, String prayerDateString,
                               Map<String, String> errors, String field1, String field2) {
        if (calendarOptional.isEmpty()) {
            return;
        }
        validateRange(calendarOptional.get(), calendar, prayerDateString, errors, field1, field2);
    }

    private void validateRange(Calendar calendar, Optional<Calendar> calendarOptional, String prayerDateString,
                               Map<String, String> errors, String field1, String field2) {
        if (calendarOptional.isEmpty()) {
            return;
        }
        validateRange(calendar, calendarOptional.get(), prayerDateString, errors, field1, field2);
    }

    private void validateRange(Calendar calendar1, Calendar calendar2, String prayerDateString,
                               Map<String, String> errors, String field1, String field2) {
        if(calendar1.after(calendar2)) {
            errors.put(
                    String.format("Invalid prayer %s, %s and %s range", prayerDateString, field1, field2),
                    String.format("%s should be before %s. %s=%s and %s=%s", field1, field2,
                            field1, CdbDateUtils.TIME_FORMAT.format(calendar1.getTime()),
                            field2, CdbDateUtils.TIME_FORMAT.format(calendar2.getTime())));
        }
    }

    @Override
    public Map<String, String> validatePrayers(List<Prayer> prayers) {
        Map<String, String> errors = new HashMap<>();
        if (prayers == null) {
            errors.put("Invalid prayers list", "Prayers not found.");
            return errors;
        }

        int prayerSize = prayers.size();
        if (prayerSize != 366) {
            errors.put("Invalid prayer size", "Import file do not contain 366 records. Total records in file " + prayerSize);
            return errors;
        }

        errors.putAll(findAllPrayersExist(prayers));
        prayers.forEach(prayer -> errors.putAll(validatePrayer(prayer)));
        return errors;
    }

    private Map<? extends String, ? extends String> findAllPrayersExist(List<Prayer> prayers) {
        Map<String, String> errors = new HashMap<>();
        prayers.sort(prayerComparator);
        Calendar calendar = CdbDateUtils.createCalendarDate(CdbDateUtils.DEFAULT_YEAR, 0, 1);
        for (int i = 0; i < 366; i++) {
            int loopDate = calendar.get(Calendar.DATE);
            int loopMonth = calendar.get(Calendar.MONTH);
            Date prayerDate = prayers.get(i).getDate();
            if (prayerDate != null) {
                Calendar prayerCalendar = CdbDateUtils.todayUtc();
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
