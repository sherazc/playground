package com.sc.cdb.services.bulk;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.prayer.PrayerComparator;
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
            errors.put("Line " + linNumber, "Do not contain enough columns");
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
        }
        prayers.sort(prayerComparator);

        return errors;
    }
}
