package com.sc.cdb.services.prayer;

import java.time.LocalDate;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.bulk.PrayerValidator;
import com.sc.cdb.services.common.DateTimeCalculator;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.utils.CommonUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
public class PrayerCalendarServiceImpl implements PrayerCalendarService {

    private PrayerConfigRepository prayerConfigRepository;
    private PrayerValidator prayerValidator;
    private PrayerComparator prayerComparator;

    public PrayerCalendarServiceImpl(
            PrayerConfigRepository prayerConfigRepository,
            PrayerValidator prayerValidator,
            PrayerComparator prayerComparator) {
        this.prayerConfigRepository = prayerConfigRepository;
        this.prayerValidator = prayerValidator;
        this.prayerComparator = prayerComparator;
    }

    @Override
    public ServiceResponse<List<Prayer>> calendar(String companyId, CalenderType calenderType, int userYear, int userMonth) {

        ServiceResponse.ServiceResponseBuilder<List<Prayer>> response = ServiceResponse.builder();

        if (!ObjectId.isValid(companyId)) {
            response.message("Invalid companyId. " + companyId);
            return response.build();
        }

        if (userYear < 0 || userYear > 3000) {
            response.message("Invalid year. " + userYear);
            return response.build();
        }

        if (userMonth < 1 || userMonth > 12) {
            response.message("Invalid month. " + userYear);
            return response.build();
        }

        Optional<PrayerConfig> prayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        if (prayerConfigOptional.isEmpty()
                || prayerConfigOptional.get().getPrayers() == null
                || prayerConfigOptional.get().getPrayers().size() < 366) {
            response.message("Can not find prayers. Maybe Prayers are not setup yet. " + companyId);
            return response.build();
        }


        List<Prayer> prayers = prayerConfigOptional.get().getPrayers();
        Map<String, String> errors = prayerValidator.validatePrayers(prayers);

        if (errors != null && !errors.isEmpty()) {
            response.fieldErrors(errors);
            response.message("Stored prayer are not valid. Admin needs to reset prayers.");
            return response.build();
        }


        // CREATE DATA - CREATE 3 PRAYERS LIST CLONE. BEFORE, CURRENT, AFTER
        List<Prayer> sortedPrayers = prayers.stream()
                .map(p -> this.updatePrayerYear(p, DateTimeCalculator.DEFAULT_YEAR))
                .sorted(prayerComparator)
                .collect(Collectors.toList());

        int userGregorianYear = userYear;
        if (CalenderType.hijri == calenderType) {
            userGregorianYear = hijriYearMonthToGregorianYear(userYear, userMonth);
        }


        // create 3 copies. before,current and after
        List<Prayer> prayers3Copies = new ArrayList<>();
        int yearAdd = -1;
        for (int i = 0; i < 3; i++) {
            int prayerCloneYear = userGregorianYear + yearAdd;
            List<Prayer> prayersClone = sortedPrayers.stream()
                    .filter(p -> this.include229onlyIfLeapYear(p, prayerCloneYear))
                    .map(p -> p.toBuilder().build()) // Create Prayer clone
                    .map(p -> this.updatePrayerYear(p, prayerCloneYear))
                    .collect(Collectors.toList());

            prayers3Copies.addAll(prayersClone);
            yearAdd++;
        }

        System.out.println(prayers3Copies);
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
        if (febTwentyNine) {
            System.out.println("found leap year date.");
        }
        return !febTwentyNine;
    }

    private int hijriYearMonthToGregorianYear(int userYear, int userMonth) {
        HijrahDate hijrahDate = HijrahDate.of(userYear, userMonth, 1);
        LocalDate localDate = IsoChronology.INSTANCE.date(hijrahDate);
        return localDate.getYear();
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
