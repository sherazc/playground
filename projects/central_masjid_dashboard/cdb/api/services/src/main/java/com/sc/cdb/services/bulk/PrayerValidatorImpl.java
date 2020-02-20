package com.sc.cdb.services.bulk;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.stereotype.Component;

@Component
public class PrayerValidatorImpl implements PrayerValidator {

    @Override
    public Optional<Map<String, String>> validateCommaSeparatedLine(int linNumber, String line) {
        return Optional.empty();
    }

    @Override
    public Optional<Map<String, String>> validatePrayers(List<Prayer> prayers) {
        return Optional.empty();
    }
}
