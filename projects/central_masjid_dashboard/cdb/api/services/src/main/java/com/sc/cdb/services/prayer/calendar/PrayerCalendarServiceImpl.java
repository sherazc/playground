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

import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.Month;
import com.sc.cdb.data.model.prayer.MonthPrayers;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.bulk.PrayerValidator;
import com.sc.cdb.services.common.CustomConfigurationsService;
import com.sc.cdb.services.common.DateTimeCalculator;
import com.sc.cdb.services.common.GregorianDate;
import com.sc.cdb.services.common.GregorianHijriConverter;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.PrayerComparator;
import com.sc.cdb.utils.CommonUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
public class PrayerCalendarServiceImpl implements PrayerCalendarService {

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

    private PrayerConfigRepository prayerConfigRepository;
    private PrayerValidator prayerValidator;
    private PrayerComparator prayerComparator;
    private GregorianHijriConverter gregorianHijriConverter;
    private CustomConfigurationsService customConfigurationsService;


    public PrayerCalendarServiceImpl(
            PrayerConfigRepository prayerConfigRepository,
            PrayerValidator prayerValidator,
            PrayerComparator prayerComparator,
            GregorianHijriConverter gregorianHijriConverter,
            CustomConfigurationsService customConfigurationsService) {
        this.prayerConfigRepository = prayerConfigRepository;
        this.prayerValidator = prayerValidator;
        this.prayerComparator = prayerComparator;
        this.gregorianHijriConverter = gregorianHijriConverter;
        this.customConfigurationsService = customConfigurationsService;
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

        List<Prayer> prayersInDb = prayerConfigOptional.get().getPrayers();
        Map<String, String> errors = prayerValidator.validatePrayers(prayersInDb);

        if (errors != null && !errors.isEmpty()) {
            response.fieldErrors(errors);
            response.message("Stored prayer are not valid. Admin needs to reset prayers.");
            return response.build();
        }

        // Hijri Adjust Days
        int hijriAdjustDays = getHijriAdjustDays(companyId);

        int userGregorianYear = userYear;

        if (CalenderType.hijri == calenderType) {
            LocalDate localDate = hijriYearMonthToLocalDate(userYear, userMonth, hijriAdjustDays);
            userGregorianYear = localDate.getYear();

        }

        // CREATE DATA - CREATE 3 PRAYERS LIST CLONE. BEFORE, CURRENT, AFTER
        List<Prayer> sortedPrayers = prayersInDb.stream()
                .map(p -> this.updatePrayerYear(p, DateTimeCalculator.DEFAULT_YEAR)) // update all years to default 2016
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
                    .map(p -> this.gregorianToHijri(p, hijriAdjustDays)) // set Hijrah date
                    .map(this::hijriToHijriString)
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

        boolean validCalendar = isValidCalenar(userMonth, prayersMonthGroups);
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


        /*

        Convert prayer to @Builder(toBuilder=true). To clone prayers.
        Find out if Builder will cause any jackson message issues.

        PrayerValidatator.validatePrayers(List<Prayer> prayers)

        CREATE DATA


        Update all prayer years to 2016 // this is to keep all records and respect leap year

        sort prayers list by gregorian date

        use userGregorianYear. If userGregorianYear not passed by user, then
        find it from userHijriYear

        List<Prayer> prayers3Copies;

        loop 3 times
            loopYear = -1
            loop over prayers
                Create clonePrayer
                * clonePrayerYear = userGregorianYear + loopYear;
                * continue prayers loop if clonePrayer.date is 2/29 and clonePrayerYear is not leap year
                update clonePrayer.date with  clonePrayerYear
                Add clonePrayer to prayers3Copies
            loopYear++;

        SLICE prayers3Copies

        List<Prayer> prayerSlice;
        find limits by CalenderType, userYear and userMonth
        add prayers3Copies's prayer if prayers3Copies's prayer.date is within limits


        GROUP BY

        if gregorian
            update prayer with the year that is passed

        if hijri
            find gregorian equal year of 1/1/{year}
            update prayers year with the found year

        sort prayers list by gregorian date

        Make new list 3 copies of the prayers with updated year
            Run loop 3 times
            Do below with 2 times
                loop over prayers
                    clone each prayer and add it to a new list
                    update prayer year with year + 1

        Update the entire list's hijriString. hijriString should have year

        Create TreeMap<String, List<Prayer>>

        if month < 1 // create data for year
            if CalenderType.gregorian

            if CalenderType.hijri

        if month > 0 // create data for month
            if CalenderType.gregorian

            if CalenderType.hijri


        return map

         */

        return response.build();
    }

    private boolean isValidCalenar(int userMonth, Map<Month, List<Prayer>> prayersMonthGroups) {
        return prayersMonthGroups != null
                && ((userMonth < 1 && prayersMonthGroups.size() == 12)
                        || (userMonth > 0 && prayersMonthGroups.size() == 1));
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

    private Prayer hijriToHijriString(Prayer prayer) {
        if (prayer.getHijrahDate() != null) {
            String hijriString = dateFormatter.format(prayer.getHijrahDate());
            prayer.setHijriString(hijriString);
        }
        return prayer;
    }

    private Prayer gregorianToHijri(Prayer prayer, int hijriAdjustDays) {
        if (prayer.getDate() != null) {
            HijrahDate hijrahDate = gregorianHijriConverter.fromGregorian(prayer.getDate());
            HijrahDate hijrahDateWithAdjustDays = hijrahDate.plus(hijriAdjustDays, ChronoUnit.DAYS);
            prayer.setHijrahDate(hijrahDateWithAdjustDays);
        }
        return prayer;
    }

    private boolean include229onlyIfLeapYear(Prayer prayer, int year) {
        boolean leapYear = year % 4 == 0;
        if (leapYear) {
            return true;
        }
        Calendar calendar = Calendar.getInstance();
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
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(prayer.getDate());
            calendar.set(Calendar.YEAR, year);
            CommonUtils.makeCalendarTimeZero(calendar);
            prayer.setDate(calendar.getTime());
        }
        return prayer;
    }
}
