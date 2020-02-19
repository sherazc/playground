package com.sc.cdb.services.bulk;

import java.util.List;
import java.util.Map;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerValidator {
    Map<String, String> validateCommaSeparatedLine(int linNumber, String line);
    Map<String, String> validatePrayers(List<Prayer> prayers);

}
