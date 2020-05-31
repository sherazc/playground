package com.sc.cdb.data.model.prayer;

import java.time.chrono.HijrahDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sc.cdb.data.common.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Builder(toBuilder = true)
public class Prayer implements Cloneable {

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date date;
    @JsonIgnore
    private HijrahDate hijrahDate;
    private String hijriString;
    private String fajr;
    private String fajrIqama;
    private String dhuhr;
    private String dhuhrIqama;
    private String asr;
    private String asrIqama;
    private String maghrib;
    private String maghribIqama;
    private String isha;
    private String ishaIqama;

    private String sunrise;

    private String fajrChange;
    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date fajrChangeDate;

    private String dhuhrChange;

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date dhuhrChangeDate;
    private String asrChange;

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date asrChangeDate;
    private String maghribChange;

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date maghribChangeDate;
    private String ishaChange;

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date ishaChangeDate;

    @Override
    public Prayer clone() {
        PrayerBuilder prayerBuilder = this.toBuilder();
        if (this.date != null) {
            prayerBuilder.date((Date) this.date.clone());
        }
        return prayerBuilder.build();
    }
}
