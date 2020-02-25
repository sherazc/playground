package com.sc.cdb.services.bulk;

import com.sc.cdb.data.model.prayer.Prayer;
import org.springframework.stereotype.Component;

@Component
public class PrayerTransformerImpl implements PrayerTransformer {

    @Override
    public String prayerToCsv(Prayer prayer) {
        return "";
    }

    @Override
    public Prayer csvToPrayer(String csvLine) {
        System.out.println(csvLine);
        return new Prayer();
    }
}
