package com.sc.cdb.services.bulk;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PrayerImportImpl implements PrayerImport {

    private PrayerValidator prayerValidator;
    private PrayerTransformer prayerTransformer;

    public PrayerImportImpl(PrayerValidator prayerValidator, PrayerTransformer prayerTransformer) {
        this.prayerValidator = prayerValidator;
        this.prayerTransformer = prayerTransformer;
    }

    @Override
    public ServiceResponse<List<Prayer>> importPrayersFile(
            String fileName, String contentType, InputStream inputStream) {

        ServiceResponse.ServiceResponseBuilder<List<Prayer>> builder = ServiceResponse.builder();
        if (!"text/csv".equalsIgnoreCase(contentType)) {
            return builder.message("Please upload .csv file").build();
        }

        Map<String, String> fieldErrors = new HashMap<>();
        List<Prayer> prayers = new ArrayList<>();

        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            int lineNumber = 0;
            while ((line = bufferedReader.readLine()) != null) {
                if (++lineNumber == 1 || StringUtils.isBlank(line)) {
                    continue;
                }
                line = line.trim();
                Optional<Map<String, String>> errorOptional = prayerValidator
                        .validateCommaSeparatedLine(lineNumber, line);

                if (errorOptional.isPresent()) {
                    fieldErrors.putAll(errorOptional.get());
                } else {
                    prayers.add(prayerTransformer.csvToPrayer(line));
                }
            }

            if (fieldErrors.size() > 0) {
                builder.fieldErrors(fieldErrors);
            }
            builder.target(prayers);
        } catch (IOException e) {
            String message = String.format("Unable to read %s. %s", fileName, e.getMessage());
            log.error(message, e);
        }


        return builder.build();
    }
}
