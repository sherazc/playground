package com.sc.cdb.webservices.prayer;

import com.sc.cdb.data.model.cc.PrayerConfig;
import com.sc.cdb.services.location.SiteLocator;
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
    private SiteLocator siteLocator;

    public PrayerController(PrayerService prayerService, SiteLocator siteLocator) {
        this.prayerService = prayerService;
        this.siteLocator = siteLocator;
    }

    @GetMapping("location/geocode")
    public ResponseEntity<?> geoCode(@RequestParam String location) {
        return ResponseEntity.ok(siteLocator.geoCode(location));
    }

    @PutMapping("{companyId}/config")
    public ResponseEntity<?> updatePrayerConfig(
            @PathVariable String companyId,
            @RequestBody PrayerConfig prayerConfig) {
        return ResponseEntity.ok(prayerService.createYearPrayerTimes(companyId, prayerConfig));
    }
}
