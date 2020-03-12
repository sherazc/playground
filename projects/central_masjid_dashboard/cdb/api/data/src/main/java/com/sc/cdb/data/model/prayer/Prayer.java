package com.sc.cdb.data.model.prayer;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sc.cdb.data.common.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Prayer {

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
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
}
