package com.sc.cdb.services.bulk;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerValidator {
    Optional<Map<String, String>> validateCommaSeparatedLine(int linNumber, String line);
    Optional<Map<String, String>> validatePrayers(List<Prayer> prayers);

}
