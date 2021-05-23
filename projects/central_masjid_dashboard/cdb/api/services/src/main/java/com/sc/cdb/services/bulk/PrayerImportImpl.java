package com.sc.cdb.services.bulk;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        if (!"text/plain".equalsIgnoreCase(contentType) && !fileName.toLowerCase().endsWith(".txt")
                && !"text/csv".equalsIgnoreCase(contentType) && !fileName.toLowerCase().endsWith(".csv")) {
            return builder.message("Please upload .txt or .csv file").build();
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
                Map<String, String> lineFieldErrors = prayerValidator
                        .validateCommaSeparatedLine(lineNumber, line);

                if (lineFieldErrors.size() > 0) {
                    fieldErrors.putAll(lineFieldErrors);
                } else {
                    prayers.add(prayerTransformer.txtToPrayer(line));
                }
            }

            if (fieldErrors.size() < 1) {
                fieldErrors.putAll(prayerValidator.validatePrayers(prayers));
                if (fieldErrors.size() < 1) {
                    builder.successful(true);
                    builder.target(prayers);
                }
            }
            builder.fieldErrors(fieldErrors);
        } catch (IOException e) {
            String message = String.format("Unable to read %s. %s", fileName, e.getMessage());
            log.error(message, e);
        }


        return builder.build();
    }
}
