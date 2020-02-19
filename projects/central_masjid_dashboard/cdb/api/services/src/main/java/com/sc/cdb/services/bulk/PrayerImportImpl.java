package com.sc.cdb.services.bulk;

import java.io.InputStream;
import java.util.List;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.model.ServiceResponse;
import org.springframework.stereotype.Component;

@Component
public class PrayerImportImpl implements PrayerImport {

    private PrayerValidator prayerValidator;

    public PrayerImportImpl(PrayerValidator prayerValidator) {
        this.prayerValidator = prayerValidator;
    }

    @Override
    public ServiceResponse<List<Prayer>> importPrayersFile(
            String fileName, String contentType, InputStream inputStream) {

        ServiceResponse.ServiceResponseBuilder<List<Prayer>> builder = ServiceResponse.builder();
        if (!"text/csv".equalsIgnoreCase(contentType)) {
            return builder.message("Please upload .csv file").build();
        }

        return builder.build();
    }
}
