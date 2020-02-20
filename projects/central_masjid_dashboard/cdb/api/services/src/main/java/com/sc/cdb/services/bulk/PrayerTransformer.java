package com.sc.cdb.services.bulk;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerTransformer {
    String prayerToCsv(Prayer prayer);
    Prayer csvToPrayer(String csvLine);
}
