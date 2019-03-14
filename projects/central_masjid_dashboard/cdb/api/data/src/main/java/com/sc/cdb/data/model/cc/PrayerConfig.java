package com.sc.cdb.data.model.cc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class PrayerConfig {
    private String location;
    private Integer calculationMethod;
    private Integer asrJuristicMethod;
    private int[] prayerOffsetMinutes = new int[7];
    private GeoCode geoCode;
}
