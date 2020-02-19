package com.sc.cdb.services.bulk;

import java.io.InputStream;
import java.util.List;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.model.ServiceResponse;

public interface PrayerImport {
    ServiceResponse<List<Prayer>> importPrayersFile(
            String fileName, String contentType, InputStream inputStream);
}
