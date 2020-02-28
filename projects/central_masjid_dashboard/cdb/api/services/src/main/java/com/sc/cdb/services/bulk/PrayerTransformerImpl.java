package com.sc.cdb.services.bulk;

import java.util.Calendar;
import java.util.Date;

import com.sc.cdb.data.model.prayer.Prayer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Component;

@Component
public class PrayerTransformerImpl implements PrayerTransformer {

    @Override
    public String prayerToCsv(Prayer prayer) {
        Date prayerDate = prayer.getDate();
        String line = String.format("%tm-%td,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s\n",
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
    public Prayer csvToPrayer(String csvLine) {
        Prayer prayer = new Prayer();
        String[] csvParts = csvLine.split(",");
        prayer.setDate(stringToDate(csvParts[0]));
        prayer.setFajr(csvParts[1]);
        prayer.setFajrIqama(csvParts[2]);
        prayer.setDhuhr(csvParts[3]);
        prayer.setDhuhrIqama(csvParts[4]);
        prayer.setAsr(csvParts[5]);
        prayer.setAsrIqama(csvParts[6]);
        prayer.setMaghrib(csvParts[7]);
        prayer.setMaghribIqama(csvParts[8]);
        prayer.setIsha(csvParts[9]);
        prayer.setIshaIqama(csvParts[10]);
        prayer.setSunrise(csvParts[11]);
        return prayer;
    }

    private Date stringToDate(String dateString) {
        if (StringUtils.isBlank(dateString)) {
            return null;
        }
        String[] dateParts = dateString.split("-");
        if (dateParts == null || dateParts.length < 2) {
            return null;
        }
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, 2016);
        calendar.set(Calendar.MONTH, NumberUtils.toInt(dateParts[0]));
        calendar.set(Calendar.DATE, NumberUtils.toInt(dateParts[1]));
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }
}
