package com.sc.cdb.services.bulk;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerTransformer {
    String prayerToCsv(Prayer prayer);

    /**
     * Expects CSV line is in valid format
     * @param csvLine
     * @return
     */
    Prayer csvToPrayer(String csvLine);
}
