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

    private PrayerDate fajrAzan;
    private PrayerDate fajrIqama;
    private PrayerDate zuharAzan;
    private PrayerDate zuharIqama;
    private PrayerDate asrAzan;
    private PrayerDate asrIqama;
    private PrayerDate maghribAzan;
    private PrayerDate maghribIqama;
    private PrayerDate ishaAzan;
    private PrayerDate ishaIqama;

    private PrayerDate Shurooq;
}
