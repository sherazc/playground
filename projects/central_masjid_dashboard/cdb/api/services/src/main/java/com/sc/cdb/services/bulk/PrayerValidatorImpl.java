package com.sc.cdb.services.bulk;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.stereotype.Component;

@Component
public class PrayerValidatorImpl implements PrayerValidator {

    @Override
    public Map<String, String> validateCommaSeparatedLine(int linNumber, String line) {
        Map<String, String> errors = new HashMap<>();
        return errors;
    }

    @Override
    public Map<String, String> validatePrayers(List<Prayer> prayers) {
        Map<String, String> errors = new HashMap<>();
        return errors;
    }
}
