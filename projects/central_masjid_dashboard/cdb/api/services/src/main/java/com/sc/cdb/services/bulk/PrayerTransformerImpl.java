package com.sc.cdb.services.bulk;

import java.util.Date;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.utils.CdbDateUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Component;

@Component
public class PrayerTransformerImpl implements PrayerTransformer {

    @Override
    public String prayerToTxt(Prayer prayer) {
        Date prayerDate = prayer.getDate();
        String line = String.format("%tm/%td,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s\n",
                prayerDate,
                prayerDate,
                touchNullString(prayer.getFajr()),
                touchNullString(prayer.getFajrIqama()),
                touchNullString(prayer.getDhuhr()),
                touchNullString(prayer.getDhuhrIqama()),
                touchNullString(prayer.getAsr()),
                touchNullString(prayer.getAsrIqama()),
                touchNullString(prayer.getMaghrib()),
                touchNullString(prayer.getMaghribIqama()),
                touchNullString(prayer.getIsha()),
                touchNullString(prayer.getIshaIqama()),
                touchNullString(prayer.getSunrise()));
        return line;
    }

    private String touchNullString(String string) {
        return string == null ? "" : string;
    }

    @Override
    public Prayer txtToPrayer(String csvLine) {
        Prayer prayer = new Prayer();
        String[] csvParts = csvLine.split(",", -1);
        prayer.setDate(stringToDate(csvParts[0].trim()));
        prayer.setFajr(csvParts[1].trim());
        prayer.setFajrIqama(csvParts[2].trim());
        prayer.setDhuhr(csvParts[3].trim());
        prayer.setDhuhrIqama(csvParts[4].trim());
        prayer.setAsr(csvParts[5].trim());
        prayer.setAsrIqama(csvParts[6].trim());
        prayer.setMaghrib(csvParts[7].trim());
        prayer.setMaghribIqama(csvParts[8].trim());
        prayer.setIsha(csvParts[9].trim());
        prayer.setIshaIqama(csvParts[10].trim());
        prayer.setSunrise(csvParts[11].trim());
        return prayer;
    }

    private Date stringToDate(String dateString) {
        if (StringUtils.isBlank(dateString)) {
            return null;
        }
        String[] dateParts = dateString.split("/");
        if (dateParts == null || dateParts.length < 2) {
            return null;
        }
        return CdbDateUtils.createCalendarDate(
                        CdbDateUtils.DEFAULT_YEAR,
                        NumberUtils.toInt(dateParts[0]) - 1,
                        NumberUtils.toInt(dateParts[1]))
                .getTime();
    }
}
