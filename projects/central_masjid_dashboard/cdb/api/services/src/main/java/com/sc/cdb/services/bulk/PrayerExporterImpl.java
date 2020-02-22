package com.sc.cdb.services.bulk;

import java.io.PrintWriter;
import java.io.Writer;

import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PrayerExporterImpl implements PrayerExporter {

    @Override
    public ServiceResponse<String> exportPrayerToWriter(PrintWriter writer, String companyId) {
        ServiceResponse.ServiceResponseBuilder<String> builder = ServiceResponse.builder();
        if (writer == null) {
            String error = "Can not export prayers. Response Writer is null.";
            log.error(error);
            builder.message(error);
            return builder.build();
        }

        if (StringUtils.isBlank(companyId)) {
            String error = "Can not export prayers. Request companyId is blank.";
            log.error(error);
            builder.message(error);
            return builder.build();
        }

        if ("2".equalsIgnoreCase(companyId)) {
            String error = "CompanyId is 2";
            log.error(error);
            builder.message(error);
            return builder.build();
        }

        builder.successful(true);
        writer.println("123");
        builder.target("my_csv_file.csv");



        return builder.build();
    }
}
