package com.sc.cdb.services.prayer.calendar;

import java.time.LocalDate;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.CompanyMonthPrayers;
import com.sc.cdb.data.model.prayer.Month;
import com.sc.cdb.data.model.prayer.MonthPrayers;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.bulk.PrayerValidator;
import com.sc.cdb.services.common.CustomConfigurationsService;
import com.sc.cdb.services.common.GregorianDate;
import com.sc.cdb.services.common.GregorianHijriConverter;
import com.sc.cdb.services.dst.PrayerConfigDstApplier;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.PrayerComparator;
import com.sc.cdb.services.prayer.PrayerConfigService;
import com.sc.cdb.services.prayer.PrayerHijriSetter;
import com.sc.cdb.utils.CdbDateUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrayerCalendarServiceImpl implements PrayerCalendarService {



    private final PrayerConfigRepository prayerConfigRepository;
    private final PrayerValidator prayerValidator;
    private final PrayerComparator prayerComparator;
    private final CustomConfigurationsService customConfigurationsService;
    private final CompanyRepository companyRepository;
    private final PrayerConfigDstApplier prayerConfigDstApplier;
    private final PrayerConfigService prayerConfigService;
    private final PrayerHijriSetter prayerHijriSetter;

    @Override
    public ServiceResponse<CompanyMonthPrayers> calendarByCompanyUrl(String companyUrl, CalenderType type,
                                                                     int year, int month) {

        ServiceResponse.ServiceResponseBuilder<CompanyMonthPrayers> response = ServiceResponse.builder();
        if (StringUtils.isBlank(companyUrl)) {
            return response.message("Can not find calendar. Company URL is blank.").build();
        }
        Optional<Company> companyOptional = companyRepository.findByUrlIgnoreCaseAndActiveTrue(companyUrl);
        if (companyOptional.isEmpty() || StringUtils.isBlank(companyOptional.get().getId())) {
            return response.message("Can not find calendar. Can not find company by URL").build();
        }


        ServiceResponse<List<MonthPrayers>> monthPrayersResponse = this.calendar(companyOptional.get().getId(), type, year, month);
        response.target(new CompanyMonthPrayers(companyOptional.get(), monthPrayersResponse.getTarget()));
        response.message(monthPrayersResponse.getMessage());
        response.successful(monthPrayersResponse.isSuccessful());
        response.fieldErrors(monthPrayersResponse.getFieldErrors());

        return response.build();
    }

    @Override
    public ServiceResponse<List<MonthPrayers>> calendar(String companyId, CalenderType calenderType, int userYear, int userMonth) {

        ServiceResponse.ServiceResponseBuilder<List<MonthPrayers>> response = ServiceResponse.builder();

        // Validation
        if (!ObjectId.isValid(companyId)) {
            response.message("Invalid companyId. " + companyId);
            return response.build();
        }

        // http://sbmt.jhuapl.edu/releases/test/sbmt/jre/lib/hijrah-config-umalqura.properties
        if (calenderType == CalenderType.hijri && (userYear < 1302 || userYear > 1599)) {
            response.message(String.format("Invalid hijri year %s. Hijri year should be between 1302 and 1599. ", userYear));
            return response.build();
        }

        if (calenderType == CalenderType.gregorian && (userYear < 1882 || userYear > 2182)) {
            response.message(String.format("Invalid year %s. Year should be between 1802 and 2182.", userYear));
            return response.build();
        }

        if (userMonth < 0 || userMonth > 12) {
            response.message(String.format("Invalid month %s. Month should be from 1 to 12.", userMonth));
            return response.build();
        }

        Optional<PrayerConfig> prayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        if (prayerConfigOptional.isEmpty()
                || prayerConfigOptional.get().getPrayers() == null
                || prayerConfigOptional.get().getPrayers().size() < 366) {
            response.message("Can not find prayers. Maybe Prayers are not setup yet. " + companyId);
            return response.build();
        }

        // Hijri Adjust Days
        int hijriAdjustDays = getHijriAdjustDays(companyId);
        int userGregorianYear = convertToGregorianYear(userYear, userMonth, hijriAdjustDays, calenderType);
        int userGregorianMonth = convertToGregorianMonth(userYear, userMonth, hijriAdjustDays, calenderType);

        prayerConfigDstApplier.addHoursToDstPeriod(prayerConfigOptional.get(), userGregorianYear, 1);

        List<Prayer> prayersInDb = prayerConfigOptional.get().getPrayers();
        Map<String, String> errors = prayerValidator.validatePrayers(prayersInDb);

        if (errors != null && !errors.isEmpty()) {
            response.fieldErrors(errors);
            response.message("Stored prayer are not valid. Admin needs to reset prayers.");
            return response.build();
        }

        prayerConfigService.overrideIqamas(companyId, prayersInDb);
        // CREATE DATA - CREATE 3 PRAYERS LIST CLONE. BEFORE, CURRENT, AFTER
        List<Prayer> sortedPrayers = prayersInDb.stream()
                .map(p -> this.updatePrayerYear(p, CdbDateUtils.DEFAULT_YEAR)) // update all years to default 2016
                .sorted(prayerComparator) // sort
                .collect(Collectors.toList());


        // create 3 copies. before,current and after
        List<Prayer> prayers3Copies = new ArrayList<>();
        int yearAdd = -1;
        for (int i = 0; i < 3; i++) {
            int prayerCloneYear = userGregorianYear + yearAdd;
            List<Prayer> prayersClone = sortedPrayers.stream()
                    .filter(p -> this.include229onlyIfLeapYear(p, prayerCloneYear)) // filter 2/29 if not leap
                    .map(p -> p.toBuilder().build()) // Create Prayer clone
                    .map(p -> this.updatePrayerYear(p, prayerCloneYear)) // year to series year
                    .map(p -> prayerHijriSetter.populateHijri(p, hijriAdjustDays)) // set Hijrah date and Hijrah String
                    .collect(Collectors.toList());

            prayers3Copies.addAll(prayersClone);
            yearAdd++;
        }

        // SLICE AND GROUP BY MONTH
        // Calculate limits
        Date[] limits = calculateLimits(calenderType, userYear, userMonth, hijriAdjustDays);

        MonthGroupingCollectorFunction monthGroupingCollectorFunction = new MonthGroupingCollectorFunction(calenderType);

        Map<Month, List<Prayer>> prayersMonthGroups = prayers3Copies
                .stream()
                .filter(p -> p.getDate().after(limits[0]) && p.getDate().before(limits[1]))
                .collect(Collectors.groupingBy(monthGroupingCollectorFunction));

        boolean validCalendar = isValidCalendar(userGregorianMonth, prayersMonthGroups);
        response.successful(validCalendar);
        List<MonthPrayers> monthPrayersList = prayersMonthGroups.keySet()
                .stream()
                .map(month -> {
                    List<Prayer> prayers = prayersMonthGroups.get(month);
                    return new MonthPrayers(month, prayers);
                })
                .sorted(Comparator.comparing(mp -> mp.getMonth().getNumber()))
                .collect(Collectors.toList());

        response.target(monthPrayersList);

        return response.build();
    }

    private int convertToGregorianYear(int year, int month, int hijriAdjustDays, CalenderType calenderType) {
        if (CalenderType.hijri == calenderType) {
            LocalDate localDate = hijriYearMonthToLocalDate(year, month, hijriAdjustDays);
            return localDate.getYear();
        } else {
            return year;
        }
    }

    private int convertToGregorianMonth(int year, int month, int hijriAdjustDays, CalenderType calenderType) {
        if (CalenderType.hijri == calenderType) {
            LocalDate localDate = hijriYearMonthToLocalDate(year, month, hijriAdjustDays);
            return localDate.getMonthValue();
        } else {
            return month;
        }
    }

    private boolean isValidCalendar(int userMonth, Map<Month, List<Prayer>> prayersMonthGroups) {
        return prayersMonthGroups != null
                // User has not specified month. Should be 12 months
                && ((userMonth < 1 && prayersMonthGroups.size() == 12)
                // User has specified month. Should always be 1 month for Gregorian.
                // Could be 2 for Hijri
                        || (userMonth > 0 && !prayersMonthGroups.isEmpty() && prayersMonthGroups.size() < 3));
    }

    private Date[] calculateLimits(CalenderType calenderType, int userYear, int userMonth, int hijriAdjustDays) {
        Date beginLimit;
        Date endLimit;

        if (userMonth < 1) {
            beginLimit = GregorianDate
                    .of(calenderType, userYear, 1, 1)
                    .plusDays(-1)
                    .plusHijriAdjustDays(hijriAdjustDays)
                    .create();
            endLimit = GregorianDate
                    .of(calenderType, userYear, 1,1)
                    .plusYear(1)
                    .plusHijriAdjustDays(hijriAdjustDays)
                    .create();
        } else {
            beginLimit = GregorianDate
                    .of(calenderType, userYear, userMonth, 1)
                    .plusDays(-1)
                    .plusHijriAdjustDays(hijriAdjustDays)
                    .create();
            endLimit = GregorianDate
                    .of(calenderType, userYear, userMonth,1)
                    .plusMonth(1)
                    .plusHijriAdjustDays(hijriAdjustDays)
                    .create();
        }
        /*

        if month is 0
            begin date = 1
            begin month = 1
            begin year = userYear
            create begin date
            minus a day from created begin date

            end date = 1
            end month = 1
            end year = userYear + 1

        if userMonth > 0
            begin date = 1
            begin month = userMonth
            begin year = userYear
            create begin date
            minus a day from created begin date

            end date = 1
            end month = userMonth
            end year = userYear
            create end date
            plus a month to end date
         */

        return new Date[]{beginLimit, endLimit};
    }

    private int getHijriAdjustDays(String companyId) {
        return customConfigurationsService.getIntConfig(companyId, "hijri_adjust_days", 0);
    }

    private boolean include229onlyIfLeapYear(Prayer prayer, int year) {
        boolean leapYear = year % 4 == 0;
        if (leapYear) {
            return true;
        }
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.setTime(prayer.getDate());
        int month = calendar.get(Calendar.MONTH);
        int date = calendar.get(Calendar.DATE);
        boolean febTwentyNine = month == 1 && date == 29;
        return !febTwentyNine;
    }

    private LocalDate hijriYearMonthToLocalDate(int userYear, int userMonth, int hijriAdjustDays) {
        int month = 1;
        if (userMonth > 0) {
            month = userMonth;
        }
        HijrahDate hijrahDate = HijrahDate
                .of(userYear, month, 1)
                .plus(hijriAdjustDays, ChronoUnit.DAYS);

        return IsoChronology.INSTANCE.date(hijrahDate);
    }

    private Prayer updatePrayerYear(Prayer prayer, int year) {
        if (prayer != null && prayer.getDate() != null) {
            Calendar calendar = CdbDateUtils.todayUtc();
            calendar.setTime(prayer.getDate());
            calendar.set(Calendar.YEAR, year);
            CdbDateUtils.makeCalendarTimeZero(calendar);
            prayer.setDate(calendar.getTime());
        }
        return prayer;
    }
}
