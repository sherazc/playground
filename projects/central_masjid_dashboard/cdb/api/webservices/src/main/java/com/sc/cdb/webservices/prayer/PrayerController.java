package com.sc.cdb.webservices.prayer;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.location.SiteLocator;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.PrayerConfigService;
import com.sc.cdb.services.prayer.PrayerService;
import com.sc.cdb.webservices.utils.JsonpService;
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
    private JsonpService jsonpService;

    public PrayerController(
            PrayerService prayerService,
            SiteLocator siteLocator,
            PrayerConfigService prayerConfigService,
            JsonpService jsonpService) {
        this.prayerService = prayerService;
        this.siteLocator = siteLocator;
        this.prayerConfigService = prayerConfigService;
        this.jsonpService = jsonpService;
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
    public ResponseEntity<?> getPrayerByCompanyIdMonthAndDay(
            @PathVariable String companyId, @PathVariable int month, @PathVariable int day,
            @RequestParam(value = "cb", required = false) String cb) {

        ServiceResponse<Prayer> responseObject = prayerConfigService
                .getPrayerByCompanyIdMonthAndDay(companyId, month, day);

        if (jsonpService.validCallback(cb)) {
            return ResponseEntity
                    .ok()
                    .contentType(new MediaType("application", "javascript", StandardCharsets.UTF_8))
                    .body(jsonpService.makeJsonpScript(cb, responseObject));
        } else {
            return ResponseEntity.ok(responseObject);

        }
    }

    @GetMapping("companyId/{companyId}/month/{month}/day/{day}/length/{length}")
    public ResponseEntity<?> getPrayersPageByCompanyIdMonthAndDay(
            @PathVariable String companyId, @PathVariable int month, @PathVariable int day,
            @PathVariable int length, @RequestParam(value = "cb", required = false) String cb) {

        ServiceResponse<List<Prayer>> responseObject = prayerConfigService
                .getPrayersPageByCompanyIdMonthAndDay(companyId, month, day, length);

        if (jsonpService.validCallback(cb)) {
            return ResponseEntity
                    .ok()
                    .contentType(new MediaType("application", "javascript", StandardCharsets.UTF_8))
                    .body(jsonpService.makeJsonpScript(cb, responseObject));
        } else {
            return ResponseEntity.ok(responseObject);

        }
    }
}
