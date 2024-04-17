package com.sc.cdb.services.prayer;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.common.GregorianHijriConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.chrono.HijrahDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class PrayerHijriSetter {
    public static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

    private final GregorianHijriConverter gregorianHijriConverter;

    public Prayer populateHijri(Prayer prayer, int hijriAdjustDays) {
        populateGregorianToHijri(prayer, hijriAdjustDays);
        populateHijriToHijriString(prayer);
        return prayer;
    }

    private void populateGregorianToHijri(Prayer prayer, int hijriAdjustDays) {
        if (prayer.getDate() != null) {
            HijrahDate hijrahDate = gregorianHijriConverter.fromGregorian(prayer.getDate());
            HijrahDate hijrahDateWithAdjustDays = hijrahDate.plus(hijriAdjustDays * -1, ChronoUnit.DAYS);
            prayer.setHijrahDate(hijrahDateWithAdjustDays);
        }
    }

    private void populateHijriToHijriString(Prayer prayer) {
        if (prayer.getHijrahDate() != null) {
            String hijriString = dateFormatter.format(prayer.getHijrahDate());
            prayer.setHijriString(hijriString);
        }
    }
}
