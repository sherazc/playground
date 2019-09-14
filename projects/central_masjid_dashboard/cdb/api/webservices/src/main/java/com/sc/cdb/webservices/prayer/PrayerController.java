package com.sc.cdb.webservices.prayer;

import java.util.Optional;

import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.location.SiteLocator;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.PrayerService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<ServiceResponse<GeoCode>> geoCode(@RequestParam String location) {
        return ResponseEntity.ok(siteLocator.geoCode(location));
    }


    /*

    Sample request

    {
        "companyId": "company1",
        "location": "Karachi Pakistan",
        "calculationMethod": 3,
        "asrJuristicMethod": 1,
        "prayerOffsetMinutes": [
            "20", 2, 3, 4, 5, 6, 7
        ],
        "geoCode": {
            "latitude": 24.8607343,
            "longitude": 67.0011364,
            "timezone": 5,
            "timezoneId": "Asia/Karachi",
            "timezoneName": "Pakistan Standard Time"
        }
    }
     */

    @PostMapping("config/create")
    public ResponseEntity<ServiceResponse<PrayerConfig>> createPrayers(
            @RequestBody PrayerConfig prayerConfig,
            @RequestParam(value = "generateIqamah", required = false) Boolean generateIqamah) {
        return ResponseEntity.ok(prayerService.createYearPrayerTimes(prayerConfig, generateIqamah));
    }

    @GetMapping("config/{companyId}")
    public ResponseEntity<PrayerConfig> getPrayerConfig(@PathVariable String companyId) {
        Optional<PrayerConfig> prayerConfigOptional = prayerService.getPrayerConfig(companyId);
        if (prayerConfigOptional.isPresent()) {
            return ResponseEntity.ok(prayerConfigOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("config")
    public ResponseEntity<ServiceResponse<String>> savePrayers(@RequestBody PrayerConfig prayerConfig) {
        if (prayerConfig == null || StringUtils.isBlank(prayerConfig.getCompanyId())) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(prayerService.savePrayerConfig(prayerConfig));
        }
    }


    @GetMapping("month/{month}/day/{day}")
    public ResponseEntity<ServiceResponse<Prayer>> savePrayers(@PathVariable ) {
        if (prayerConfig == null || StringUtils.isBlank(prayerConfig.getCompanyId())) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(prayerService.savePrayerConfig(prayerConfig));
        }
    }
}
