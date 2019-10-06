package com.sc.cdb.webservices.prayer;

import java.util.Optional;

import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.location.SiteLocator;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.PrayerConfigService;
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
    private PrayerConfigService prayerConfigService;

    public PrayerController(
            PrayerService prayerService,
            SiteLocator siteLocator,
            PrayerConfigService prayerConfigService) {
        this.prayerService = prayerService;
        this.siteLocator = siteLocator;
        this.prayerConfigService = prayerConfigService;
    }

    @GetMapping("location/geocode")
    public ResponseEntity<ServiceResponse<GeoCode>> geoCode(@RequestParam String location) {
        return ResponseEntity.ok(siteLocator.geoCode(location));
    }

    @PostMapping("config/create")
    public ResponseEntity<ServiceResponse<PrayerConfig>> createPrayers(
            @RequestBody PrayerConfig prayerConfig,
            @RequestParam(value = "generateIqamah", required = false) Boolean generateIqamah) {
        return ResponseEntity.ok(prayerService.createYearPrayerTimes(prayerConfig, generateIqamah));
    }

    @GetMapping("config/{companyId}")
    public ResponseEntity<PrayerConfig> getPrayerConfig(@PathVariable String companyId) {
        Optional<PrayerConfig> prayerConfigOptional = prayerConfigService.getPrayerConfig(companyId);
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
            return ResponseEntity.ok(prayerConfigService.savePrayerConfig(prayerConfig));
        }
    }

    @PostMapping("config/{companyId}/dst")
    public ResponseEntity<ServiceResponse<String>> savePrayers(@PathVariable String companyId, @RequestBody Dst dst) {
        if (companyId == null || dst == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(prayerConfigService.saveDst(companyId, dst));
        }
    }


    @GetMapping("companyId/{companyId}/month/{month}/day/{day}")
    public ResponseEntity<ServiceResponse<Prayer>> getPrayerByCompanyIdMonthAndDay(
            @PathVariable String companyId, @PathVariable int month, @PathVariable int day) {
        return ResponseEntity.ok(prayerConfigService.getPrayerByCompanyIdMonthAndDay(companyId, month, day));

    }
}
