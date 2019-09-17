package com.sc.cdb.data.model.prayer;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Prayer {
    private Date date;

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
    private Date fajrChangeDate;
    private String dhuhrChange;
    private Date dhuhrChangeDate;
    private String asrChange;
    private Date asrChangeDate;
    private String maghribChange;
    private Date maghribChangeDate;
    private String ishaChange;
    private Date ishaChangeDate;
}
