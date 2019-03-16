package com.sc.cdb.webservices.prayer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.services.prayer.PrayerService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/prayer", produces = MediaType.APPLICATION_JSON_VALUE)
public class PrayerController {

    private PrayerService prayerService;

    public PrayerController(PrayerService prayerService) {
        this.prayerService = prayerService;
    }

    @GetMapping("location/geocode")
    public ResponseEntity<?> geoCode(@RequestParam String location) {
        return ResponseEntity.ok(prayerService.geoCode(location));
    }

    @PutMapping("{companyId}/config")
    public ResponseEntity<?> updatePrayerConfig(
            @PathVariable String companyId,
            @RequestBody PrayerConfig prayerConfig) {
        return ResponseEntity.ok(prayerService.savePrayerConfig(companyId, prayerConfig));
    }

    public static void main(String[] args) throws Exception {
        GeoCode geoCode = new GeoCode(
                1.2, 2.3, 5.5,
                "timezoneId", "timezoneName");
        PrayerConfig prayerConfig = new PrayerConfig(
                "location", 1, 2,
                new int[7], geoCode);
        prayerConfig.setGeoCode(geoCode);
        ObjectMapper objMapper = new ObjectMapper();
        String jsonString = objMapper.writeValueAsString(prayerConfig);
        System.out.println(jsonString);
    }

}
