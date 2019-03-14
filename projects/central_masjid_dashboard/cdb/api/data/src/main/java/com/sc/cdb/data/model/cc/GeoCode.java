package com.sc.cdb.data.model.cc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class GeoCode {
    private double latitude;
    private double longitude;
    private double timezone;
    private String timezoneId;
    private String timezoneName;
}
