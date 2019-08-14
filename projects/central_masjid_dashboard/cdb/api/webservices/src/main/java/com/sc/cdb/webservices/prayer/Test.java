package com.sc.cdb.webservices.prayer;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;

public class Test {
  public static void main(String[] args) throws JsonProcessingException {
    PrayerConfig prayerConfig = new PrayerConfig();
    prayerConfig.setCompanyId("company1");

    GeoCode geoCode = new GeoCode();
    geoCode.setLatitude(100);
    geoCode.setLongitude(200);
    geoCode.setTimezone(-5);
    geoCode.setTimezoneId("1000");
    geoCode.setTimezoneName("name");
    prayerConfig.setGeoCode(geoCode);

    prayerConfig.setAsrJuristicMethod(1);
    prayerConfig.setCalculationMethod(2);
    prayerConfig.setLocation("Location");
    prayerConfig.setPrayerOffsetMinutes(new int[]{1,2,3,4,5,6});


    List<Prayer> prayers = Arrays.asList(

    );

    prayerConfig.setPrayers(prayers);

    String json = new ObjectMapper().writeValueAsString(prayerConfig);
    System.out.println(json);
  }
}
