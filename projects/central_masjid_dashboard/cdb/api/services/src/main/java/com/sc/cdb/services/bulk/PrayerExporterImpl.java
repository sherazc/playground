package com.sc.cdb.services.bulk;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.common.File;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.PrayerComparator;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PrayerExporterImpl implements PrayerExporter {
    private PrayerConfigRepository prayerConfigRepository;
    private CompanyRepository companyRepository;
    private PrayerComparator prayerComparator;

    public PrayerExporterImpl(
            PrayerConfigRepository prayerConfigRepository,
            CompanyRepository companyRepository,
            PrayerComparator prayerComparator) {
        this.prayerConfigRepository = prayerConfigRepository;
        this.companyRepository = companyRepository;
        this.prayerComparator = prayerComparator;
    }

    @Override
    public ServiceResponse<File> exportPrayerToWriter(String companyId) {
        ServiceResponse.ServiceResponseBuilder<File> builder = ServiceResponse.builder();

        if (StringUtils.isBlank(companyId) || !ObjectId.isValid(companyId)) {
            String error = "Can not export prayers. Request companyId is invalid.";
            log.error(error);
            builder.message(error);
            return builder.build();
        }

        Optional<PrayerConfig> prayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        if (prayerConfigOptional.isPresent()
                && prayerConfigOptional.get().getPrayers() != null
                && prayerConfigOptional.get().getPrayers().size() > 365) {

            File file = new File();
            file.setName(createDownloadFileName(companyId));

            List<Prayer> prayers = prayerConfigOptional.get().getPrayers();
            prayers.sort(prayerComparator);
            prayers.forEach(prayer -> file.getContent().append(writePrayer(prayer)));

            builder.successful(true);
            builder.target(file);
        } else {
            builder.message("Failed to download prayers. Can not file prayers or 366 records do not exist.");
        }
        return builder.build();
    }

    private String writePrayer(Prayer prayer) {
        Date prayerDate = prayer.getDate();

        String line = String.format("%tm-%td,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s\n",
                prayerDate,
                prayerDate,
                prayer.getFajr(),
                prayer.getFajrIqama(),
                prayer.getDhuhr(),
                prayer.getDhuhrIqama(),
                prayer.getAsr(),
                prayer.getAsrIqama(),
                prayer.getMaghrib(),
                prayer.getMaghribIqama(),
                prayer.getIsha(),
                prayer.getIshaIqama(),
                prayer.getSunrise());

        return line;
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
