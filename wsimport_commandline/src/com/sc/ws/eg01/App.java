package com.sc.ws.eg01;

import com.sc.ws.geoipservice.GeoIP;
import com.sc.ws.geoipservice.GeoIPService;
import com.sc.ws.geoipservice.GeoIPServiceSoap;

public class App {
    public static void main(String[] args) {
        GeoIPService geoIPService = new GeoIPService();
        GeoIPServiceSoap geoIPServiceSoap = geoIPService.getGeoIPServiceSoap();
        GeoIP geoIP = geoIPServiceSoap.getGeoIP("64.233.177.138");
        System.out.println(geoIP.getCountryName());
    }
}
