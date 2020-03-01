package com.sc.cdb.services.bulk;

import java.util.List;
import java.util.Map;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerValidator {

    /**
     * Validates CSV line format
     * @param lineNumber
     * @param line
     * @return
     */
    Map<String, String> validateCommaSeparatedLine(int lineNumber, String line);

    /**
     * Validates prayer time ranges.
     * @param prayer
     * @return
     */
    Map<String, String> validatePrayer(Prayer prayer);

    Map<String, String> validatePrayers(List<Prayer> prayers);
}
