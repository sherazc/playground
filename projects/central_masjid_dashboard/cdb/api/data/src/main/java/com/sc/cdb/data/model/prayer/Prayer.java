package com.sc.cdb.data.model.prayer;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "centralControl")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Prayer {
    private Date date;

    private PrayerDate fajr;
    private PrayerDate fajrIqama;
    private PrayerDate dhuhr;
    private PrayerDate dhuhrIqama;
    private PrayerDate asr;
    private PrayerDate asrIqama;
    private PrayerDate maghrib;
    private PrayerDate maghribIqama;
    private PrayerDate isha;
    private PrayerDate ishaIqama;

    private PrayerDate sunrise;
}
