package com.sc.cdb.services.bulk;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PrayerExporterImpl implements PrayerExporter {
    private PrayerConfigRepository prayerConfigRepository;
    private CompanyRepository companyRepository;

    public PrayerExporterImpl(
            PrayerConfigRepository prayerConfigRepository, CompanyRepository companyRepository) {
        this.prayerConfigRepository = prayerConfigRepository;
        this.companyRepository = companyRepository;
    }

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

        Optional<PrayerConfig> prayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        if (prayerConfigOptional.isPresent()
                && prayerConfigOptional.get().getPrayers() != null
                && prayerConfigOptional.get().getPrayers().size() > 365) {

            prayerConfigOptional
                    .get()
                    .getPrayers()
                    .sort()
                    .forEach(prayer -> writePrayer(prayer, writer));

            builder.successful(true);
            builder.target(createDownloadFileName(companyId));
        } else {
            builder.message("Failed to download prayers. Prayers do not exist or not 366");
        }
        return builder.build();
    }

    private void writePrayer(Prayer prayer, PrintWriter writer) {

    }

    private String createDownloadFileName(String companyId) {
        Optional<Company> companyOptional = companyRepository.findById(companyId);
        String timeStamp = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String fileName;
        if (companyOptional.isEmpty() || StringUtils.isBlank(companyOptional.get().getName())) {
            fileName = String.format("mdb_prayers_%s.csv", timeStamp);
        } else {
            String companyName = companyOptional.get()
                    .getName()
                    .replaceAll("\\s+", " ")
                    .replaceAll("\\s", "_");
            fileName = String.format("mdb_prayers_%s_%s.csv", timeStamp, companyName);
        }
        return fileName;
    }
}
