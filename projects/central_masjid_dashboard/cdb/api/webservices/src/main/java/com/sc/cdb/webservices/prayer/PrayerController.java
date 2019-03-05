package com.sc.cdb.webservices.prayer;

import com.sc.cdb.services.prayer.PrayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prayer")
public class PrayerController {

    private PrayerService prayerService;

    public PrayerController(PrayerService prayerService) {
        this.prayerService = prayerService;
    }

    @GetMapping("location/geocode")
    public ResponseEntity<?> geoCode(@RequestParam String location) {
        return ResponseEntity.ok(prayerService.geoCode(location));
    }
}
