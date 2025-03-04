package com.sc.cdb.webservices.prayer;

import java.util.List;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.CompanyMonthPrayers;
import com.sc.cdb.data.model.prayer.MonthPrayers;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.calendar.PrayerCalendarService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/calendar/")
public class PrayerCalendarController {

    private final PrayerCalendarService prayerCalendarService;

    public PrayerCalendarController(PrayerCalendarService prayerCalendarService) {
        this.prayerCalendarService = prayerCalendarService;
    }

    @GetMapping("/companyId/{companyId}/type/{type}/year/{year}")
    public ServiceResponse<List<MonthPrayers>> calendar(
            @PathVariable String companyId,
            @PathVariable CalenderType type,
            @PathVariable Integer year,
            @RequestParam(required = false) Integer month) {
        int userMonth = 0;
        if (month != null) {
            userMonth = month;
        }
        return prayerCalendarService.calendar(companyId, type, year, userMonth);
    }

    @GetMapping("/companyUrl/{companyUrl}/type/{type}/year/{year}")
    public ServiceResponse<CompanyMonthPrayers> calendarByUrl(
            @PathVariable String companyUrl,
            @PathVariable CalenderType type,
            @PathVariable Integer year,
            @RequestParam(required = false) Integer month) {
        int userMonth = 0;
        if (month != null) {
            userMonth = month;
        }
        return prayerCalendarService.calendarByCompanyUrl(companyUrl, type, year, userMonth);
    }
}
